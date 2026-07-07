import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('instagram');
    const body = await req.json().catch(() => ({}));
    const action = body.action || 'list';

    // Get Instagram user ID
    const meRes = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);
    if (!meRes.ok) {
      const errText = await meRes.text();
      console.error('Instagram /me error:', errText);
      return Response.json({ error: 'Failed to get Instagram user' }, { status: 502 });
    }
    const me = await meRes.json();

    if (action === 'reply') {
      // Send an approved reply to a specific comment
      const { commentId, message } = body;
      if (!commentId || !message) {
        return Response.json({ error: 'commentId and message are required' }, { status: 400 });
      }
      const replyRes = await fetch(
        `https://graph.instagram.com/${commentId}/replies?access_token=${accessToken}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
        }
      );
      if (!replyRes.ok) {
        const errText = await replyRes.text();
        console.error('Instagram reply error:', errText);
        return Response.json({ error: 'Failed to post reply' }, { status: 502 });
      }
      const replyData = await replyRes.json();
      return Response.json({ success: true, replyId: replyData.id });
    }

    // Default action: list recent comments across product posts with AI-suggested replies

    // Fetch recent media (up to 25)
    const mediaRes = await fetch(
      `https://graph.instagram.com/${me.id}/media?fields=id,caption,media_url,permalink,timestamp&limit=25&access_token=${accessToken}`
    );
    if (!mediaRes.ok) {
      const errText = await mediaRes.text();
      console.error('Instagram media error:', errText);
      return Response.json({ error: 'Failed to fetch media' }, { status: 502 });
    }
    const mediaData = await mediaRes.json();
    const posts = mediaData.data || [];

    // For each post, fetch comments
    const allComments = [];
    for (const post of posts) {
      const commentsRes = await fetch(
        `https://graph.instagram.com/${post.id}/comments?fields=id,text,timestamp,username,like_count&access_token=${accessToken}`
      );
      if (!commentsRes.ok) continue;
      const commentsData = await commentsRes.json();
      for (const c of (commentsData.data || [])) {
        allComments.push({
          id: c.id,
          text: c.text,
          username: c.username,
          timestamp: c.timestamp,
          like_count: c.like_count || 0,
          post: {
            id: post.id,
            caption: post.caption || '',
            permalink: post.permalink || '',
            media_url: post.media_url || '',
          },
        });
      }
    }

    // Generate AI-suggested reply for each comment
    const commentsWithSuggestions = [];
    for (const comment of allComments) {
      try {
        const llmRes = await base44.integrations.Core.InvokeLLM({
          prompt: `You manage the Instagram account for "Unforgotten Pour" — a studio that preserves ashes, flowers, and keepsakes in handcrafted resin art and jewelry (resin globes, shaped blocks, notebooks, memorial jewelry, pet memorials).

A customer commented on this product post:
Post caption: "${comment.post.caption}"
Comment from @${comment.username}: "${comment.text}"

Write a warm, professional reply (max 280 characters) that:
- Thanks them for their comment
- Addresses their specific question or sentiment
- Subtly invites them to order or learn more if relevant
- Sounds human, not robotic — match the brand's reverent, artisan tone

Reply with ONLY the suggested reply text, nothing else.`,
          response_json_schema: { type: 'object', properties: { reply: { type: 'string' } } },
        });
        commentsWithSuggestions.push({ ...comment, suggested_reply: llmRes.reply || '' });
      } catch (e) {
        console.error('LLM suggestion failed for comment', comment.id, e.message);
        commentsWithSuggestions.push({ ...comment, suggested_reply: '' });
      }
    }

    return Response.json({
      success: true,
      ig_username: me.username,
      count: commentsWithSuggestions.length,
      comments: commentsWithSuggestions,
    });
  } catch (error) {
    console.error('instagramComments error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
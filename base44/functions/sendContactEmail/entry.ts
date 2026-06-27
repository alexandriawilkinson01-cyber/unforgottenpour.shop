import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Build an RFC 2822 message with proper base64url encoding for Gmail API
function buildGmailMessage(to, subject, body) {
  const lines = [
    `To: ${to}`,
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset=UTF-8`,
    `MIME-Version: 1.0`,
    ``,
    body,
  ];
  const raw = lines.join('\r\n');
  // base64url encode
  return btoa(raw).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

    const subject = `New message from ${name}`;
    const emailBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const raw = buildGmailMessage('AlexandriaWilkinson01@gmail.com', subject, emailBody);

    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Gmail API error:', errText);
      return Response.json({ error: `Gmail API error: ${errText}` }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Contact form email error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
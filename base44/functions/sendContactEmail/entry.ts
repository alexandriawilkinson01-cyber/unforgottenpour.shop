import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Strip CR/LF to prevent email header injection (CWE-93)
function sanitizeHeader(value) {
  return String(value || '').replace(/[\r\n]/g, '');
}

// Build an RFC 2822 message with proper base64url encoding for Gmail API
function buildGmailMessage(to, subject, body) {
  const lines = [
    `To: ${sanitizeHeader(to)}`,
    `Subject: ${sanitizeHeader(subject)}`,
    `Content-Type: text/plain; charset=UTF-8`,
    `MIME-Version: 1.0`,
    ``,
    body,
  ];
  const raw = lines.join('\r\n');
  const bytes = new TextEncoder().encode(raw);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    // Save the submission to the database first (so it's never lost)
    let submission;
    try {
      submission = await base44.asServiceRole.entities.ContactSubmission.create({
        name,
        email,
        message,
        email_sent: false,
      });
    } catch (dbErr) {
      console.error('Failed to save contact submission:', dbErr.message);
    }

    // Send email via Gmail
    let emailSent = false;
    try {
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

      if (res.ok) {
        emailSent = true;
        if (submission) {
          await base44.asServiceRole.entities.ContactSubmission.update(submission.id, { email_sent: true });
        }
      } else {
        const errText = await res.text();
        console.error('Gmail API error:', errText);
      }
    } catch (emailErr) {
      console.error('Email send failed:', emailErr.message);
    }

    return Response.json({ success: true, email_sent: emailSent });
  } catch (error) {
    console.error('Contact form email error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    const result = await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'AlexandriaWilkinson01@gmail.com',
      from_name: 'Unforgotten Pour Website',
      subject: `New message from ${name}`,
      body: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return Response.json({ success: true, result });
  } catch (error) {
    console.error('Contact form email error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
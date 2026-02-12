import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email address required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILJET_API_KEY;
    const secretKey = process.env.MAILJET_SECRET_KEY;

    if (!apiKey || !secretKey) {
      console.error("MailJet credentials not configured");
      return NextResponse.json(
        { error: "Email service temporarily unavailable" },
        { status: 500 }
      );
    }

    // MailJet API v3.1
    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${apiKey}:${secretKey}`).toString("base64")}`,
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: "noreply@flowstatefm.com",
              Name: "FlowState FM",
            },
            To: [
              {
                Email: email,
              },
            ],
            Subject: "Your Free Focus Kit is Here!",
            TextPart: `Welcome to FlowState FM!\n\nThank you for requesting your Free Focus Kit. We're excited to help you achieve peak productivity and deep flow.\n\nYour kit includes:\n- Focus Playlist Guide\n- Flow State Triggers\n- Distraction Blockers\n- Productivity Rituals\n\nStart listening: https://flowstatefm.com/listen\n\nTo your focus,\nThe FlowState FM Team`,
            HTMLPart: `
              <!DOCTYPE html>
              <html>
                <head>
                  <style>
                    body { font-family: Georgia, serif; color: #ffffff; background-color: #000000; }
                    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
                    .header { text-align: center; margin-bottom: 40px; }
                    h1 { font-size: 32px; color: #76d4d2; margin: 0; }
                    .content { line-height: 1.8; color: #cccccc; }
                    .cta { text-align: center; margin: 30px 0; }
                    .button { display: inline-block; padding: 16px 32px; background-color: #76d4d2; color: #000000; text-decoration: none; border-radius: 8px; font-weight: bold; }
                    .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #666666; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <h1>FlowState FM</h1>
                    </div>
                    <div class="content">
                      <p>Welcome to FlowState FM!</p>
                      <p>Thank you for requesting your <strong>Free Focus Kit</strong>. We're excited to help you achieve peak productivity and deep flow.</p>
                      <p><strong>Your kit includes:</strong></p>
                      <ul>
                        <li>Focus Playlist Guide</li>
                        <li>Flow State Triggers</li>
                        <li>Distraction Blockers</li>
                        <li>Productivity Rituals</li>
                      </ul>
                      <div class="cta">
                        <a href="https://flowstatefm.com/listen" class="button">Start Listening Now</a>
                      </div>
                      <p>To your focus,<br><strong>The FlowState FM Team</strong></p>
                    </div>
                    <div class="footer">
                      <p>© ${new Date().getFullYear()} FlowState FM. All rights reserved.</p>
                    </div>
                  </div>
                </body>
              </html>
            `,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("MailJet error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscribe API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

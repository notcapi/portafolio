import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * TEMPORARY TEST ENDPOINT - DELETE AFTER FIXING
 *
 * This endpoint actually tries to send an email and returns the detailed error
 */
export async function GET() {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({
        success: false,
        error: "RESEND_API_KEY not found",
      }, { status: 500 });
    }

    if (!process.env.CONTACT_EMAIL_TO) {
      return NextResponse.json({
        success: false,
        error: "CONTACT_EMAIL_TO not found",
      }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Test <contacto@ma6r.dev>",
      to: [process.env.CONTACT_EMAIL_TO],
      subject: "Test from production - diagnostics",
      html: `
        <h1>Test Email</h1>
        <p>This is a test email from the production contact form API.</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
        <p>API Key prefix: ${process.env.RESEND_API_KEY.substring(0, 10)}</p>
      `,
      text: `Test email from production. Timestamp: ${new Date().toISOString()}`,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        error: {
          name: error.name,
          message: error.message,
          statusCode: (error as any)?.statusCode,
        },
        apiKeyPrefix: process.env.RESEND_API_KEY.substring(0, 10),
        fromEmail: "contacto@ma6r.dev",
        toEmail: process.env.CONTACT_EMAIL_TO,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      emailId: data?.id,
      apiKeyPrefix: process.env.RESEND_API_KEY.substring(0, 10),
      message: "Email sent successfully",
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}

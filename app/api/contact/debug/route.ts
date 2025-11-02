import { NextResponse } from "next/server";

/**
 * TEMPORARY DEBUG ENDPOINT - DELETE AFTER FIXING
 *
 * This endpoint checks environment variables without exposing sensitive data
 */
export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    env: {
      RESEND_API_KEY: process.env.RESEND_API_KEY ? {
        exists: true,
        prefix: process.env.RESEND_API_KEY.substring(0, 5),
        length: process.env.RESEND_API_KEY.length,
      } : { exists: false },
      CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO ? {
        exists: true,
        value: process.env.CONTACT_EMAIL_TO,
      } : { exists: false },
      NEXT_PUBLIC_ENABLE_CONTACT_FORM: {
        exists: !!process.env.NEXT_PUBLIC_ENABLE_CONTACT_FORM,
        value: process.env.NEXT_PUBLIC_ENABLE_CONTACT_FORM,
      },
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
    },
    resend: {
      canImport: false,
      error: null as string | null,
    },
  };

  // Test Resend import
  try {
    const { Resend } = await import('resend');
    diagnostics.resend.canImport = true;

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        // Try to list domains (will fail if API key is send-only, but that's OK)
        const { error } = await resend.domains.list();
        if (error) {
          diagnostics.resend.error = `Domain list error: ${error.message} (this is OK for send-only keys)`;
        }
      } catch (error) {
        diagnostics.resend.error = error instanceof Error ? error.message : 'Unknown error';
      }
    }
  } catch (error) {
    diagnostics.resend.error = error instanceof Error ? error.message : 'Failed to import Resend';
  }

  return NextResponse.json(diagnostics, { status: 200 });
}

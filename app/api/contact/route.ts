import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

// Lazy initialize Resend to avoid build-time errors
let resend: Resend | null = null;
function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos").max(20).optional().or(z.literal("")),
  company: z.string().max(100).optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(5000),
  // Honeypot field for spam protection
  website: z.string().max(0).optional(),
});

// Simple in-memory rate limiter (stores IP -> timestamp[])
// In production, consider using Redis or Upstash
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 3;

/**
 * Rate limiter: allows MAX_REQUESTS_PER_WINDOW requests per RATE_LIMIT_WINDOW
 */
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(identifier) || [];

  // Filter out timestamps outside the current window
  const recentTimestamps = timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  // Add current timestamp and update map
  recentTimestamps.push(now);
  rateLimitMap.set(identifier, recentTimestamps);

  // Cleanup old entries periodically (simple memory management)
  if (rateLimitMap.size > 1000) {
    const cutoff = now - RATE_LIMIT_WINDOW;
    for (const [key, times] of rateLimitMap.entries()) {
      const validTimes = times.filter((t) => t > cutoff);
      if (validTimes.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, validTimes);
      }
    }
  }

  return true;
}

/**
 * Get client identifier (IP address or forwarded IP)
 */
function getClientIdentifier(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

/**
 * Email template
 */
function generateEmailHTML(name: string, email: string, message: string, phone?: string, company?: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo mensaje de contacto</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                Nuevo mensaje de contacto
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 24px; color: #111827; font-size: 16px; line-height: 24px;">
                Has recibido un nuevo mensaje desde tu portafolio:
              </p>

              <!-- Info Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px; background-color: #f3f4f6; border-radius: 6px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #374151; font-size: 14px;">Nombre:</strong>
                          <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #374151; font-size: 14px;">Email:</strong>
                          <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">
                            <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                          </p>
                        </td>
                      </tr>
                      ${phone ? `
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #374151; font-size: 14px;">Teléfono:</strong>
                          <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">
                            <a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a>
                          </p>
                        </td>
                      </tr>
                      ` : ''}
                      ${company ? `
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #374151; font-size: 14px;">Empresa:</strong>
                          <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${company}</p>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="padding: 20px; background-color: #f9fafb; border-left: 4px solid #667eea; border-radius: 4px; margin-bottom: 24px;">
                <strong style="color: #374151; font-size: 14px; display: block; margin-bottom: 8px;">Mensaje:</strong>
                <p style="margin: 0; color: #111827; font-size: 16px; line-height: 24px; white-space: pre-wrap;">${message}</p>
              </div>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="text-align: center; padding: 24px 0;">
                    <a href="mailto:${email}?subject=Re: Contacto desde el portafolio"
                       style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Responder a ${name}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 14px; text-align: center;">
                Este mensaje fue enviado desde el formulario de contacto de<br />
                <a href="https://ma6r.dev" style="color: #667eea; text-decoration: none;">ma6r.dev</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    // Check required environment variables
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL_TO) {
      console.error("Missing required environment variables: RESEND_API_KEY or CONTACT_EMAIL_TO");
      return NextResponse.json(
        { error: "El formulario de contacto no está configurado correctamente" },
        { status: 503 }
      );
    }

    // Rate limiting
    const clientIdentifier = getClientIdentifier(request);
    if (!checkRateLimit(clientIdentifier)) {
      return NextResponse.json(
        {
          error: "Has excedido el límite de mensajes. Por favor, intenta más tarde.",
          retryAfter: RATE_LIMIT_WINDOW / 1000 / 60, // in minutes
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(RATE_LIMIT_WINDOW / 1000),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, company, message, website } = validationResult.data;

    // Honeypot check (spam protection)
    if (website) {
      // Silently accept but don't send email
      return NextResponse.json(
        { success: true, message: "Mensaje enviado correctamente" },
        { status: 200 }
      );
    }

    // Send email via Resend
    const emailHTML = generateEmailHTML(name, email, message, phone, company);
    const emailText = `
Nuevo mensaje de contacto

Nombre: ${name}
Email: ${email}
${phone ? `Teléfono: ${phone}` : ''}
${company ? `Empresa: ${company}` : ''}

Mensaje:
${message}

---
Este mensaje fue enviado desde el formulario de contacto de ma6r.dev
    `.trim();

    const resendClient = getResend();
    if (!resendClient) {
      throw new Error("Resend client not initialized");
    }

    // Using verified domain ma6r.dev
    const { data, error: resendError } = await resendClient.emails.send({
      from: "Portafolio <contacto@ma6r.dev>",
      to: [process.env.CONTACT_EMAIL_TO],
      replyTo: email,
      subject: `Nuevo contacto de ${name}`,
      html: emailHTML,
      text: emailText,
    });

    // Check if email was sent successfully
    if (resendError || !data) {
      console.error("Resend error:", resendError);
      throw new Error("Failed to send email");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Mensaje enviado correctamente. Te responderé pronto.",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact form error:", error);

    // Don't expose internal errors to client
    return NextResponse.json(
      {
        error: "Error al enviar el mensaje. Por favor, intenta de nuevo o contáctame directamente.",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: "Método no permitido" },
    { status: 405 }
  );
}

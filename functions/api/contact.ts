/// <reference types="@cloudflare/workers-types" />
/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Required Pages environment variables:
 *   TURNSTILE_SECRET_KEY  — from Cloudflare Turnstile dashboard
 *   CONTACT_TO            — your inbox, e.g. hello@yourdomain.com
 *   CONTACT_FROM          — verified sender, e.g. site@yourdomain.com
 *   RESEND_API_KEY        — from resend.com (or swap for MailChannels)
 */
interface Env {
  TURNSTILE_SECRET_KEY: string;
  CONTACT_TO: string;
  CONTACT_FROM: string;
  RESEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const form = await request.formData();
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const company = String(form.get("company") ?? "");
    const turnstileToken = String(form.get("cf-turnstile-response") ?? "");

    // Honeypot: bots fill hidden fields.
    if (company) return new Response("ok", { status: 200 });

    if (!name || !email || !message || message.length > 5000) {
      return new Response("Invalid input", { status: 400 });
    }

    // Verify Turnstile
    const verify = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: request.headers.get("CF-Connecting-IP") ?? "",
        }),
      },
    );
    const verifyJson = (await verify.json()) as { success: boolean };
    if (!verifyJson.success) {
      return new Response("Captcha failed", { status: 400 });
    }

    // Send email via Resend
    const send = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to: [env.CONTACT_TO],
        reply_to: email,
        subject: `Portfolio inquiry from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!send.ok) {
      return new Response("Mail failed", { status: 502 });
    }

    return new Response("ok", { status: 200 });
  } catch {
    return new Response("Server error", { status: 500 });
  }
};

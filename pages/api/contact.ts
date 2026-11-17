import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import ContactEmail, { type ContactEmailContext } from "../../emails/ContactEmail";
import { rateLimit, getClientIp } from "../../lib/rateLimit";
import { verifyToken } from "../../lib/csrf";

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_ORIGINS = [
  "https://setproduct.com",
  "https://www.setproduct.com",
  "http://localhost:3000",
];

/**
 * Machine-readable error codes. The modal maps them to human copy, and GA4
 * receives the code, so reports stay stable even if the wording changes.
 */
export type ContactErrorCode =
  | "method"
  | "origin"
  | "spam"
  | "token_missing"
  | "token_expired"
  | "token_invalid"
  | "email_invalid"
  | "message_short"
  | "message_long"
  | "rate_minute"
  | "rate_day"
  | "send_failed";

type ResponseData = {
  success?: boolean;
  error?: string;
  code?: ContactErrorCode;
};

const EMAIL_MAX = 254;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 5000;
// Deliberately loose: one @, no spaces, a dot in the domain. Strict RFC regexes
// reject real addresses more often than they stop junk.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Trims a client-sent string and drops anything that is not a string. */
function cleanString(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

/**
 * The context is informational only: it never decides whether the message is
 * accepted, so a missing or malformed object simply produces empty fields.
 */
function readContext(raw: unknown): ContactEmailContext {
  const source = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const location = cleanString(source.location, 64).replace(/[^a-z0-9_]/g, "");
  return {
    location: location || "unknown",
    pagePath: cleanString(source.pagePath, 300),
    referrer: cleanString(source.referrer, 300),
    landing: cleanString(source.landing, 300),
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed", code: "method" });
  }

  const origin = req.headers.origin;
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ error: "Forbidden", code: "origin" });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const { website, _token, _timestamp, context: rawContext } = body;

  if (website) {
    return res.status(400).json({ error: "Invalid submission", code: "spam" });
  }

  const csrf = verifyToken(String(_token ?? ""), Number(_timestamp));
  if (!csrf.valid) {
    return res.status(403).json({ error: csrf.reason, code: csrf.code });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (email.length > EMAIL_MAX || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email", code: "email_invalid" });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (message.length < MESSAGE_MIN) {
    return res.status(400).json({ error: "Message is too short", code: "message_short" });
  }
  if (message.length > MESSAGE_MAX) {
    return res.status(400).json({ error: "Message is too long", code: "message_long" });
  }

  // The limit is checked last, right before sending: a typo in the email must
  // not burn one of the few attempts a person gets per day.
  const ip = getClientIp(req);
  const limit = rateLimit(ip, 1, 3);
  if (!limit.allowed) {
    return res.status(429).json({ error: limit.reason, code: limit.code });
  }

  const context = readContext(rawContext);

  try {
    // The Resend SDK does not throw on API failures (bad key, quota, domain):
    // it resolves with `{ error }`. Without this check a failed send showed
    // "Thank you" to the person while the lead was silently lost.
    const { error } = await resend.emails.send({
      from: "Setproduct Contact <contact@setproduct.com>",
      to: "hello@setproduct.com",
      // "Reply" in the inbox goes to the person, not back to contact@.
      replyTo: email,
      subject: `Contact form: ${email} (${context.location})`,
      react: ContactEmail({ email, message, context }),
    });

    if (error) {
      console.error("Resend rejected the contact email:", error);
      return res.status(502).json({ error: "Failed to send email", code: "send_failed" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: "Failed to send email", code: "send_failed" });
  }
}

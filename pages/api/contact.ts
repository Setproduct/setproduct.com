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

type ResponseData = {
  success?: boolean;
  error?: string;
};

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
    return res.status(405).json({ error: "Method not allowed" });
  }

  const origin = req.headers.origin;
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const ip = getClientIp(req);
  const limit = rateLimit(ip, 1, 3);
  if (!limit.allowed) {
    return res.status(429).json({ error: limit.reason });
  }

  const { email, message, website, _token, _timestamp, context: rawContext } = req.body;

  if (website) {
    return res.status(400).json({ error: "Invalid submission" });
  }

  const csrf = verifyToken(_token, _timestamp);
  if (!csrf.valid) {
    return res.status(403).json({ error: csrf.reason });
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  const context = readContext(rawContext);

  try {
    await resend.emails.send({
      from: "Setproduct Contact <contact@setproduct.com>",
      to: "hello@setproduct.com",
      // "Reply" in the inbox goes to the person, not back to contact@.
      replyTo: email,
      subject: `Contact form: ${email} (${context.location})`,
      react: ContactEmail({ email, message, context }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}

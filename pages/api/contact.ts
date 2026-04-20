import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import ContactEmail from "../../emails/ContactEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

type ResponseData = {
  success?: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, message } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    await resend.emails.send({
      from: "Setproduct Contact <contact@setproduct.com>",
      to: "hello@setproduct.com",
      subject: `Contact form: ${email}`,
      react: ContactEmail({ email, message }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}

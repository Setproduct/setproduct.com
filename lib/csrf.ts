import crypto from "crypto";

const SECRET = process.env.CSRF_SECRET || "setproduct-csrf-fallback-secret-change-me";
const MAX_AGE_MS = 5 * 60 * 1000; // 5 minutes

export function generateToken(): { token: string; timestamp: number } {
  const timestamp = Date.now();
  const token = crypto
    .createHmac("sha256", SECRET)
    .update(String(timestamp))
    .digest("hex");
  return { token, timestamp };
}

type VerifyResult =
  | { valid: true }
  | { valid: false; reason: string; code: "token_missing" | "token_expired" | "token_invalid" };

export function verifyToken(token: string, timestamp: number): VerifyResult {
  if (!token || !timestamp || !Number.isFinite(timestamp)) {
    return { valid: false, reason: "Missing security token", code: "token_missing" };
  }

  const age = Date.now() - timestamp;
  if (age > MAX_AGE_MS) {
    return { valid: false, reason: "Form expired. Please refresh and try again", code: "token_expired" };
  }

  if (age < 0) {
    return { valid: false, reason: "Invalid timestamp", code: "token_invalid" };
  }

  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(String(timestamp))
    .digest("hex");

  if (token !== expected) {
    return { valid: false, reason: "Invalid security token", code: "token_invalid" };
  }

  return { valid: true };
}

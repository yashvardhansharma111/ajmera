import NodeCache from "node-cache";

/**
 * In-memory OTP cache (per server instance). Entries expire after TTL.
 * Keyed as `${target}:${value}` — e.g. "phone:+919876543210" or "email:x@y.com".
 */

const OTP_TTL_SECONDS = 5 * 60; // 5 minutes
const VERIFIED_TTL_SECONDS = 30 * 60; // how long a verified mark is usable for signup
const MAX_ATTEMPTS = 5;

export type OtpTarget = "phone" | "email";

export type OtpEntry = {
  otp: string;
  attempts: number;
  verified: boolean;
  createdAt: number;
};

const cache = new NodeCache({
  stdTTL: OTP_TTL_SECONDS,
  checkperiod: 60,
  useClones: false,
});

function key(target: OtpTarget, value: string) {
  return `${target}:${value.trim().toLowerCase()}`;
}

export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function storeOtp(target: OtpTarget, value: string, otp: string): void {
  const entry: OtpEntry = {
    otp,
    attempts: 0,
    verified: false,
    createdAt: Date.now(),
  };
  cache.set(key(target, value), entry, OTP_TTL_SECONDS);
}

export function verifyOtp(
  target: OtpTarget,
  value: string,
  otp: string,
): { ok: boolean; message: string } {
  const k = key(target, value);
  const entry = cache.get<OtpEntry>(k);
  if (!entry) {
    return { ok: false, message: "OTP expired or not requested. Please request a new code." };
  }
  if (entry.verified) {
    return { ok: true, message: "Already verified" };
  }
  if (entry.attempts >= MAX_ATTEMPTS) {
    cache.del(k);
    return {
      ok: false,
      message: "Too many wrong attempts. Request a new code.",
    };
  }
  if (entry.otp !== otp.trim()) {
    entry.attempts += 1;
    cache.set(k, entry, OTP_TTL_SECONDS);
    return { ok: false, message: "Invalid OTP. Please try again." };
  }
  entry.verified = true;
  cache.set(k, entry, VERIFIED_TTL_SECONDS);
  return { ok: true, message: "Verified" };
}

export function isVerified(target: OtpTarget, value: string): boolean {
  const entry = cache.get<OtpEntry>(key(target, value));
  return !!entry?.verified;
}

export function clearVerification(target: OtpTarget, value: string): void {
  cache.del(key(target, value));
}

import { NextRequest, NextResponse } from "next/server";

/**
 * Extracts the real client IP from a NextRequest, considering various proxy headers
 * @param req NextRequest object
 * @returns The real client IP address
 */
export function getClientIP(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");
  const cfConnectingIP = req.headers.get("cf-connecting-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  const host = req.headers.get("host");
  if (host && (host.includes("localhost") || host.includes("127.0.0.1"))) {
    return "127.0.0.1 (localhost)";
  }

  return "unknown";
}

/**
 * Gets headers with real client IP and user agent for proxy requests
 * @param req NextRequest object
 * @returns Object with X-Real-IP and X-User-Agent headers
 */
export function getClientHeaders(req: NextRequest): Record<string, string> {
  const clientIP = getClientIP(req);
  const userAgent = req.headers.get("user-agent") || "";

  return {
    "X-Real-IP": clientIP,
    "X-User-Agent": userAgent,
  };
}

/**
 * Forward Set-Cookie headers from an upstream API response without joining them.
 * Joining with commas breaks cookies that contain commas (Expires, etc.).
 */
export function applySetCookieHeaders(res: NextResponse, apiRes: Response): void {
  const cookies = apiRes.headers.getSetCookie?.() || [];
  for (const cookie of cookies) {
    res.headers.append("Set-Cookie", cookie);
  }
}

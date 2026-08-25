import { NextRequest, NextResponse } from "next/server";

import { applySetCookieHeaders } from "@/lib/proxy-utils";

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie");
  const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";
  const url = `${API_BASE_URL}/auth/me`;

  const apiRes = await fetch(url, {
    method: "GET",
    headers: {
      cookie: cookieHeader || "",
    },
    redirect: "manual",
  });

  const resBody = await apiRes.text();
  const res = new NextResponse(resBody, {
    status: apiRes.status,
    headers: {
      "Content-Type": "application/json",
    },
  });

  applySetCookieHeaders(res, apiRes);

  return res;
}

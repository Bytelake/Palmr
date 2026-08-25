import { NextRequest, NextResponse } from "next/server";

import { applySetCookieHeaders } from "@/lib/proxy-utils";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

export async function POST(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie");
  const url = `${API_BASE_URL}/invite-tokens`;

  const apiRes = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieHeader || "",
    },
    body: JSON.stringify({}),
    redirect: "manual",
  });

  const resBody = await apiRes.json();

  const res = NextResponse.json(resBody, {
    status: apiRes.status,
  });

  applySetCookieHeaders(res, apiRes);

  return res;
}

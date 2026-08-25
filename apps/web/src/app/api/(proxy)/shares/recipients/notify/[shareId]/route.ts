import { NextRequest, NextResponse } from "next/server";

import { applySetCookieHeaders } from "@/lib/proxy-utils";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

export async function POST(req: NextRequest, { params }: { params: Promise<{ shareId: string }> }) {
  const cookieHeader = req.headers.get("cookie");
  const { shareId } = await params;
  const body = await req.text();
  const url = `${API_BASE_URL}/shares/${shareId}/notify`;

  const apiRes = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieHeader || "",
    },
    body: body,
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

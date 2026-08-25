import { NextRequest, NextResponse } from "next/server";

import { applySetCookieHeaders } from "@/lib/proxy-utils";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

export async function PUT(req: NextRequest) {
  const body = await req.text();
  const cookieHeader = req.headers.get("cookie");
  const url = `${API_BASE_URL}/users`;

  const apiRes = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieHeader || "",
    },
    body,
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

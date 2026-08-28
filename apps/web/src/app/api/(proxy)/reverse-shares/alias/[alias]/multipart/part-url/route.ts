import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

export async function GET(req: NextRequest, { params }: { params: Promise<{ alias: string }> }) {
  const searchParams = req.nextUrl.searchParams.toString();
  const { alias } = await params;

  const url = `${API_BASE_URL}/reverse-shares/alias/${alias}/multipart/part-url${searchParams ? `?${searchParams}` : ""}`;

  const apiRes = await fetch(url, {
    method: "GET",
    redirect: "manual",
  });

  const resBody = await apiRes.text();

  const res = new NextResponse(resBody, {
    status: apiRes.status,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

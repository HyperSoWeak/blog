import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  return new NextResponse("OK", { status: 200 });
}

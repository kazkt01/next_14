import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(_req: NextRequest) {
    console.log("webhook dispatch");
    return NextResponse.json({ received: true })
}
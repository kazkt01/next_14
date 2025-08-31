import { NextRequest, NextResponse } from "next/server";

export async function post(_req: NextRequest) {
    console.log("webhook dispatch");
    return NextResponse.json({ received: true })
}
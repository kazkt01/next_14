import { NextRequest, NextResponse } from "next/server";

export async function post(req: NextRequest) {
    console.log("webhook dispatch");
    return NextResponse.json({received: true})
}
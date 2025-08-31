// import { NextRequest, NextResponse } from "next/server";

// export const runtime = "nodejs";

// export async function POST(_req: NextRequest) {
//     console.log("webhook dispatch");
//     return NextResponse.json({ received: true })
// }


// app/api/stripe-hooks/route.ts
import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const ua = req.headers.get("user-agent");
  const raw = await req.text();
  console.log("webhook dispatch", { fromStripe: !!sig, ua, len: raw.length });
  return NextResponse.json({ received: true }, { status: 200 });
}

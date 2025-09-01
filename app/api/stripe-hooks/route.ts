import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";
import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
export const runtime = "nodejs";



export async function POST(req: NextRequest) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!)
    const signature = req.headers.get("stripe-signature")
    const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

    const reqBuffer = Buffer.from(await req.arrayBuffer())

    let event;

    try { 
        event = stripe.webhooks.constructEvent(
            reqBuffer!,
            signature!,
            endpointSecret!,
        );
    } catch (err: any) {
        return NextResponse.json(`webhook Error: ${err.message}`, {status: 401})
    }

    switch (event.type) {
        case "customer.subscription.created":
            const customerSubscriptionCreated = event.data.object;
            await supabase.from("profile").update({
                is_subscribed: true,
                interval: customerSubscriptionCreated.items.data[0].plan.interval
            })
            .eq("stripe_customer", event.data.object.customer);
    }
    return NextResponse.json({ received: true });
    // console.log("webhook dispatch");
    // return NextResponse.json({ received: true })
}


























// // app/api/stripe-hooks/route.ts
// import { NextRequest, NextResponse } from "next/server";
// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// export async function POST(req: NextRequest) {
//   const sig = req.headers.get("stripe-signature");
//   const ua = req.headers.get("user-agent");
//   const raw = await req.text();
//   console.log("webhook dispatch", { fromStripe: !!sig, ua, len: raw.length });
//   return NextResponse.json({ received: true }, { status: 200 });
// }

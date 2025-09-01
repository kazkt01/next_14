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

    const reqBuffer = Buffer.from(await req.arrayBuffer());

    let event;

    try { 
        event = stripe.webhooks.constructEvent(
            reqBuffer!,
            signature!,
            endpointSecret!,
        );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            .eq("stripe_customer", event.data.object.customer as string);
    }
    return NextResponse.json({ received: true });
    // console.log("webhook dispatch");
    // return NextResponse.json({ received: true })
}

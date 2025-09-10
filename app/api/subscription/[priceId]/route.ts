import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";
import { supabaseRouteHandlerClient } from "@/utils/supabaseRouteHandlerClient";

export const runtime = 'nodejs';


export async function GET(
req: NextRequest,
    { params }: { params: { priceId: string } }
) {

    const supabase = supabaseRouteHandlerClient();
    const {data, error: getUserError} = await supabase.auth.getUser();
    const user = data.user;

    if (getUserError) {
        return NextResponse.json({ error: "Failed to get user", details: getUserError.message }, { status: 500 });
    }

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, {status:401});
    } 

    const {data: stripe_customer_data, error: profileError } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id",user?.id)
    .single();

    if (profileError) {
        return NextResponse.json({ error: "Failed to load profile", details: profileError.message }, { status: 500 });
    }

    const priceId = params.priceId;

    const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);

    try {
        const session = await stripe.checkout.sessions.create({
            customer: stripe_customer_data?.stripe_customer as string,
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancelled`,
            
        });
        return NextResponse.json({ id: session.id });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: "Failed to create checkout session", details: message }, { status: 500 });
    }
}
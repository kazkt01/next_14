import { NextRequest, NextResponse } from "next/server";
import initiStripe from "stripe";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { email } = data;
    const stripe = new initiStripe(process.env.STRIPE_SECRET_KEY!);
    const customer = await stripe.customers.create({
        email,
    });
    return NextResponse.json({
        message: `stripe customer created: ${customer.id}`,
    });
}
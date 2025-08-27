// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";
// import {cookies} from "next/headers"
import {createClient} from "@supabase/supabase-js"

export async function POST(req: NextRequest) {

    // const supabase = createRouteHandlerClient({cookies});
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

    const query = req.nextUrl.searchParams.get("API_ROUTE_SECRET");
    if(query !== process.env.API_ROUTE_SECRET) {
        return NextResponse.json({
            message: "APIを叩く権限がありません",
        })
    }
    const data = await req.json();
    const { id, email } = data.record;

    const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
    const customer = await stripe.customers.create({
        email,
    });
    // POSTMANのAPIテストする際は、Cookies参照させないと正常に動かないのでヘッダーにCookiesを登録しておこう。　
    await supabaseAdmin
    .from("profile")
    .update({ stripe_customer: customer.id,})
    .eq("id",id);

    return NextResponse.json({
        message: `stripe customer created: ${customer.id}`,
    });
    
    // APIが叩かれているかテスト
    // console.log("HIT /api/create-stripe-customer");

}
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import initiStripe from "stripe";
import {cookies} from "next/headers"

export async function POST(req: NextRequest) {
    const supabase = createRouteHandlerClient({cookies});
    const query = req.nextUrl.searchParams.get("API_ROUTE_SECRET");
    if(query !== process.env.API_ROUTE_SECRET) {
        return NextResponse.json({
            message: "APIを叩く権限がありません",
        })
    }
    const data = await req.json();

    const { id, email } = data.record;
    const stripe = new initiStripe(process.env.STRIPE_SECRET_KEY!);
    const customer = await stripe.customers.create({
        email,
    });
    // POSTMANのAPIテストする際は、Cookies参照させないと正常に動かないのでヘッダーにCookiesを登録しておこう。　
    await supabase.from("profile").update({
        stripe_customer: customer.id,
    })
    .eq("id",id);

    // APIが叩かれているかテスト
    console.log("HIT /api/create-stripe-customer");


 
    // デバック
    // const { data: updated, error } = await supabase.from("profile").update({
    //     stripe_customer: customer.id,
    // }).eq("id",id);
    // console.log(error?.message);
    // console.log(id,customer.id);
    // if (error) {
    //     return NextResponse.json({ step: "update", error: error.message }, { status: 400 });
    // }
    // if (!updated || updated.length === 0) {
    //     return NextResponse.json({ step: "update", error: "0 rows updated (id not found or RLS denied)" }, { status: 404 });
    // }



    return NextResponse.json({
        message: `stripe customer created: ${customer.id}`,
    });
}
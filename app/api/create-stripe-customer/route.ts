import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";
import {cookies} from "next/headers"
// import {createClient} from "@supabase/supabase-js"

export async function POST(req: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies });

// cookiesが原因でstripe_customerカラムにデータが入らないことを特定
//   const { data: { user }, error,} = await supabase.auth.getUser();
//   console.log("👤 current user:", user, "error:", error);

    // シークレットチェック、APIを叩けるユーザーを制限
    const query = req.nextUrl.searchParams.get("API_ROUTE_SECRET");
    if(query !== process.env.API_ROUTE_SECRET) {
        return NextResponse.json({
            message: "APIを叩く権限がありません",
        });
    }

    const data = await req.json();
    const { id, email } = data.record;

    console.log("🔥 HIT /api/create-stripe-customer"); // APIに到達したか確認


    const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
    const customer = await stripe.customers.create({
        email,
    });

    // POSTMANのAPIテストする際は、Cookies参照させないと正常に動かないのでヘッダーにCookiesを登録しておこう。　
    const { error } = await supabase
    .from("profile")
    .update({ stripe_customer: customer.id,})
    .eq("id", id);


    
    // console.log("profile select:", data, error);
    
    // console.log(id, customer.id);
    // console.log(error?.message);

    return NextResponse.json({
        message: `stripe customer created: ${customer.id}`,
    });
    
}
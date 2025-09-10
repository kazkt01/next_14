import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";
import { supabaseRouteHandlerClient } from "@/utils/supabaseRouteHandlerClient";
// import {createClient} from "@supabase/supabase-js"

export const runtime = "nodejs"; 

// export async function POST(req: NextRequest) {
//     const supabase = supabaseRouteHandlerClient();

//     const data = await req.json();
//     const { id, email } = data;

//     const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
//     const customer = await stripe.customers.create({
//         email,
//     });
//     await supabase
//     .from("profile")
//     .update({ stripe_customer: customer.id,})
//     .eq("id", id);
    
//     return NextResponse.json({
//         message: `stripe customer created: ${customer.id}`,
//     });
    
// }


// ====================================================================
export async function POST(req: NextRequest) {
    const supabase = supabaseRouteHandlerClient();

// cookiesが原因でstripe_customerカラムにデータが入らないことを特定
//   const { data: { user }, error,} = await supabase.auth.getUser();
//   console.log("👤 current user:", user, "error:", error);

    // シークレットチェック、APIを叩けるユーザーを制限
    // const query = req.nextUrl.searchParams.get("API_ROUTE_SECRET");
    // if(query !== process.env.API_ROUTE_SECRET) {
    //     return NextResponse.json({
    //         message: "APIを叩く権限がありません",
    //     });
    // }

    // const data = await req.json();
    // const { id, email } = data.record;
    // ai add
    const body = await req.json();
     const { id, email } = body.record ?? body;

    console.log("🔥 HIT /api/create-stripe-customer"); // APIに到達したか確認


    const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
    const customer = await stripe.customers.create({
        email,
    });

    // POSTMANのAPIテストする際は、Cookies参照させないと正常に動かないのでヘッダーにCookiesを登録しておこう。
    // EsLINTエラーの受け取りかでひっかかってエラーになる
    // const { error } = await supabase
    await supabase
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
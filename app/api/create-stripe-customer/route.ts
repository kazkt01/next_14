import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";
// import { supabaseRouteHandlerClient } from "@/utils/supabaseRouteHandlerClient";

// node.jsランタイムで動かす指定、Stripe SDKを使うためにEdgeじゃなくNodeにしている
export const runtime = "nodejs"; 

// APIのエントリーポイントでHTTP POSTで叩かれている。
export async function POST(req: NextRequest) {
    // supabaseクライアントを作成　ここWebhookからCookieが来ない問題　↓ここが一番問題の可能性がある。
    // const supabase = supabaseRouteHandlerClient();

    // ↓簡易修正
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);


    //セキュリティチェック 
    const query = req.nextUrl.searchParams.get("API_ROUTE_SECRET");
    if (query !== process.env.API_ROUTE_SECRET) {
        return NextResponse.json({
            message: "APIを叩く権限がありません",
        })
    }

    // リクエスとのJSONを読み込み。
    const data = await req.json();
    console.log("🔥 Webhook payload:", JSON.stringify(data, null, 2));

    // idとemailを取り出す。　しかし、実際は、recordフィールどにデータを持つからここがミスってる可能性も？
    const { id, email } = data.record;

    // stripeの初期化
    const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
    
    // stripe上に顧客を新規作成。
    const customer = await stripe.customers.create({
        email,
    });

    // supabaseのprofileテーブルでidが一致する業を探し、stripe_customerにcustomer.idを保存
    const { error } = await supabase
    .from("profile")
    .update({ stripe_customer: customer.id,})
    .eq("id", id);
    console.log(error);

    return NextResponse.json({
        message: `stripe customer created: ${customer.id}`,
    });  
}


// ====================================================================
// export async function POST(req: NextRequest) {
//     const supabase = supabaseRouteHandlerClient();

// // cookiesが原因でstripe_customerカラムにデータが入らないことを特定
// //   const { data: { user }, error,} = await supabase.auth.getUser();
// //   console.log("👤 current user:", user, "error:", error);

//     // シークレットチェック、APIを叩けるユーザーを制限
//     // const query = req.nextUrl.searchParams.get("API_ROUTE_SECRET");
//     // if(query !== process.env.API_ROUTE_SECRET) {
//     //     return NextResponse.json({
//     //         message: "APIを叩く権限がありません",
//     //     });
//     // }

//     // const data = await req.json();
//     // const { id, email } = data.record;
//     // ai add
//     const body = await req.json();
//      const { id, email } = body.record ?? body;

//     console.log("🔥 HIT /api/create-stripe-customer"); // APIに到達したか確認


//     const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
//     const customer = await stripe.customers.create({
//         email,
//     });

//     // POSTMANのAPIテストする際は、Cookies参照させないと正常に動かないのでヘッダーにCookiesを登録しておこう。
//     // EsLINTエラーの受け取りかでひっかかってエラーになる
//     // const { error } = await supabase
//     await supabase
//     .from("profile")
//     .update({ stripe_customer: customer.id,})
//     .eq("id", id);
//     // console.log("profile select:", data, error);
    
//     // console.log(id, customer.id);
//     // console.log(error?.message);

//     return NextResponse.json({
//         message: `stripe customer created: ${customer.id}`,
//     });
    
// }
import { supabaseRouteHandlerClient } from "@/utils/supabaseRouteHandlerClient";
import { NextResponse ,NextRequest } from "next/server";



// API 以下Oauth認証のAPIを作る方法
export async function GET(request: NextRequest) {
    const requestURL = new URL(request.url);
    const code = requestURL.searchParams.get("code");

    if (code){
        const supabase = supabaseRouteHandlerClient();
        await supabase.auth.exchangeCodeForSession(code);   
    }
    
    return NextResponse.redirect(requestURL.origin);
};



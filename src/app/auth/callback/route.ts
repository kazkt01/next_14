import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse ,NextRequest } from "next/server";



// API 以下Oauth認証のAPIを作る方法
export async function GET(request: NextRequest) {
    const requestURL = new URL(request.url);
    const code = requestURL.searchParams.get("code");

    if (code){
        const supabase = createRouteHandlerClient({ cookies});
        await supabase.auth.exchangeCodeForSession(code);   
    }
    
    return NextResponse.redirect(requestURL.origin);
};



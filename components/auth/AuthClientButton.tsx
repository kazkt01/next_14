"use client"
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { Button } from '../ui/button'; 
import { useRouter } from 'next/navigation';

const AuthClientButton = ({session}: {session :Session | null}) => {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSignIn = async () => {
      await supabase.auth.signInWithOAuth({
        provider:"github",
        options: {
            // location.originの変数にすることでデプロイ先のオリジンに切り替わる
            redirectTo: `${location.origin}/auth/callback`
        }
      }) 
    };
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
      //   console.log("ログアウトしました");
      };

  return (

    <>
  {session ? 
    <Button onClick={handleSignOut}>ログアウト</Button>
    : 
    <Button onClick={handleSignIn}>サインイン</Button>
    }
  </>

)
  
  
};

export default AuthClientButton;

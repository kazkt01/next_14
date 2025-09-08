import React from 'react'
import AuthClientButton from './AuthClientButton';
import { supabaseServer } from '@/utils/supabaseServer';

const AuthServerButton = async () => {

    const supabase = supabaseServer();
    
  //   const {data : user} = await supabase.auth.getSession();
  //   const session = user.session;
  //   console.log(session);

  // return <AuthClientButton session={session}/>

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  
  if (error) {
    // 必要ならハンドリング
    console.error(error);
  }
  return <AuthClientButton session={session} />;
  


  
}

export default AuthServerButton
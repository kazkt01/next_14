"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/router';

const SubscriptionManagementButton = () => {

    const router = useRouter();
    
    const loadPortal = async () => {
            const response = await fetch("https://next-14-self.vercel.app/api/portal");
            const data = await response.json();
        router.push(data.url);
        }
  return (
      <div>
          <Button onClick={loadPortal} >サブスクリプション管理</Button>
      </div>
  )
}

export default SubscriptionManagementButton
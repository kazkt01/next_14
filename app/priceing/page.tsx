
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { createServerComponentClient, SupabaseClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import initStripe from "stripe"
import type Stripe from "stripe"
import {cookies} from "next/headers"
import { Database } from '@/lib/database.types'
import SubscriptionButton from '@/components/checkout/SubscriptionButton'

interface Plan {
  id: string;
  name: string;
  price: number | null;
  interval: Stripe.Price.Recurring.Interval | null;
  currency: string;
}

const getAllplans = async ():Promise<Plan[]> => {
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);

  const { data: plansList } = await stripe.plans.list();

  const plans = await Promise.all(
    plansList.map(async (plan) => {
      const product = await stripe.products.retrieve(plan.product as string);

      return  {
        id: plan.id,
        name: product.name,
        price: plan.amount,
        interval: plan.interval,
        currency: plan.currency,
      };
    })
  );

  // 値段が安い順にループされる関数
  const sortedPlans = plans.sort(
    // (a,b) => parseInt(a.price!) - parseInt(b.price!)
    (a,b) => (a.price ?? 0) - (b.price ?? 0) 
  );


  return sortedPlans;
} 


  const getProfileData = async (supabase: SupabaseClient<Database>) => {
    const {data: profile } = await supabase.from("profile").select("*").single();
    return profile;
};

const PricingPage = async () => {

  const supabase = createServerComponentClient({cookies});
  const {data: user} = await supabase.auth.getSession();


  const [plans, profile] = await Promise.all([
       await getAllplans(),
       await getProfileData(supabase),
  ]);


  const showSubScribeButton = !!user.session && !profile.is_subscribed;
  const showCreateAccountButton = !user.session;
  const showManageSubscriptionButton = !!user.session && profile.is_subscribed;

  return (
    <div className='w-full max-w-3xl mx-auto py-16 flex justify-around' >
      {/* <pre>{JSON.stringify(plans, null, 2)}</pre> */}
      {plans.map((plan) => (
        <Card className="shadow-md" key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.name} プラン</CardTitle>
                <CardDescription>
                  {plan.name}
                </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{plan.price} / {plan.interval}</p>
            </CardContent>
            <CardFooter>
              {showSubScribeButton && <SubscriptionButton planId={plan.id} />}
              {showCreateAccountButton && <Button>ログインする</Button>}
              {showManageSubscriptionButton && <Button>サブスクリプション管理する</Button>}
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}

export default PricingPage
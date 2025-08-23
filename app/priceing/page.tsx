
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import initStripe from "stripe"
import type Stripe from "stripe"

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

const PricingPage = async () => {

  const plans = await getAllplans();

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
              <Button>サブスクリプションを契約する</Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}

export default PricingPage
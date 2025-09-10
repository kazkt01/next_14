"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Button } from "../ui/button";

const SubscriptionButton = ({planId}: {planId:string}) => {
    const processSubscription = async () => {
     const response = await fetch(
         `/api/subscription/${planId}`,
         { credentials: "include" }
        ); 
    
    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(text || `Request failed: ${response.status}`);
    }

    let data: { id: string };
    try {
        data = await response.json();
    } catch {
        throw new Error("Invalid JSON response");
    }

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    await stripe?.redirectToCheckout({sessionId: data.id});

    };
    return (
    <Button onClick={async() => processSubscription()}>
       サブスクリプション契約をする
    </Button>
    );
}

export default SubscriptionButton
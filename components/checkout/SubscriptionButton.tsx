"use client";

import { Button } from "../ui/button";

const SubscriptionButton = ({planId}: {planId:string}) => {
    const processSubscription = async () => {
     const response = await fetch(
         `https://localhost:3000/api/subscription/${planId}`
        );       
    };
    return (
    <Button onClick={async() => processSubscription()}>
       サブスクリプション契約をする
    </Button>
    );
}

export default SubscriptionButton
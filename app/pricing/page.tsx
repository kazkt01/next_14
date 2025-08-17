import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import React from 'react'

const PricingPage = () => {
  return (
    <div className='w-full max-w-3xl mx-auto py-16 flex justify-around' >
        <Card>
        <CardHeader>
            <CardTitle>Basic</CardTitle>
            {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent>
            <p>saijdaoidjoaijdoaijdoaijdoaijoij</p>
        </CardContent>
        <CardFooter>
            <p>doaijdoaijdoaijdoaijdoaijdosiij</p>
        </CardFooter>
        </Card>
    </div>
  )
}

export default PricingPage
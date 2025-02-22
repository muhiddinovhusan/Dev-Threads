"use client"
import {loadStripe ,StripeElementsOptions }from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import { useCheckoutStore } from '@/store/useCheckoutStateStore'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CheckoutForm from './CheckoutForm'
import { CartEntry  as ICartEntry} from 'use-shopping-cart/core';
import toast from 'react-hot-toast'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

const Checkout = ({items , totalPrice}:{
  totalPrice : number | undefined; items : ICartEntry[]
}) => {

  const router = useRouter();
  const checkoutStore = useCheckoutStore();
  const [clientSecret , setClientSecret]=useState("")

  
  useEffect(()=>{
   const createOrder = async ()=> {
    try {
      const res = await fetch("/api/create-order",
       {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items : items,
          payment_intent_id: checkoutStore.paymentIntent,
          totalAmount:  totalPrice,
        }),
       }
      )
      if(res.status === 403){
        toast.error("Please Sign in")
        router.push("/sign-in")
        checkoutStore.setCheckout("cart")
          return
        
      }
      if(!res.ok){
        throw new Error("network issues")
      }
      const data = await res.json()
      if(data && data.paymentIntent){
        setClientSecret(data.paymentIntent.client_secret)
        checkoutStore.setPaymentIntent(data.paymentIntent.id)
      }else{
        console.error("unexpected data structure" , data)
      }
    }
   catch (error) {
      console.error(error)
    }
   }
   createOrder()
  }, [])


  const options : StripeElementsOptions= {
    clientSecret , 
    appearance: {
      theme: "stripe",
      labels: 'floating',

    },
  }

  return (
clientSecret && (
  <Elements stripe={stripePromise} options={options}>
    <CheckoutForm clientSecret={clientSecret} />
  </Elements>
)

  )
}

export default Checkout

"use client"

import Button from "@/components/ui/Button"
import { useCheckoutStore } from "@/store/useCheckoutStateStore"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useShoppingCart } from "use-shopping-cart"



const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
    const stripe = useStripe();
    const elements = useElements();
    const checkoutStore = useCheckoutStore()
    const [isLoading, setIsLoading] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const { clearCart, totalPrice } = useShoppingCart()
    const router = useRouter()
    useEffect(() => {
        if (!stripe) {
            return
        } if (!clientSecret) {
            return
        }
    }, [stripe])

    useEffect(() => {
        async function fetchLatestOrderId() {
            try {
                const res = await fetch("/api/orderid")
                const data = await res.json()
                setOrderId(data.orderId)
            } catch (error) {
                console.error(error)
            }
        }
        fetchLatestOrderId()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        setIsLoading(true)

        stripe.confirmPayment({
            elements,
            redirect: "if_required",

        }).then((res) => {
            if (!res.error) {
                checkoutStore.setCheckout("cart")
                fetch("/api/update-order-status", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        orderId: orderId,
                        status: "payment successful"
                    })

                })
            }
            setIsLoading(false)
            router.push('/')
            checkoutStore.setCheckout("")
            toast.success("Payment successful")
        })
    }


    return (
       <form className="text-gray-600"
       onSubmit={handleSubmit}
       >
        <PaymentElement options={{layout : "tabs"}}/>
<h1 className="py-4 text-sm font-bold" >
    {totalPrice}
</h1>
<Button 
disabled={isLoading || !stripe || !elements}
onClick={()=> clearCart()}
type="submit"
>
<span>
    {isLoading ? (
        <span> Processing ...</span>
    ) : (
        <span>Pay Now</span>
    )}
</span>
</Button>
       </form>
    )
}

export default CheckoutForm
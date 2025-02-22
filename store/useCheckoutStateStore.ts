import { persist } from 'zustand/middleware'
import { create } from "zustand"


type CheckoutState ={
    paymentIntent : string
    onCheckout : string 
    setPaymentIntent : (val:string)=> void
    setCheckout : (val: string)=> void
}

export const useCheckoutStore = create<CheckoutState>()(
    persist(
        (set) => ({
            ///Initial state
            paymentIntent: "",
            onCheckout: " cart",

            //Set State
            setPaymentIntent: (val) => set((set) =>
                ({ paymentIntent: val })
            ),
            setCheckout: (val) => set((set) => (
                { onCheckout: val }
            )),



        }),
        {name: "checkout-store"}
    )
)
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useShoppingCart } from "use-shopping-cart";

import React from 'react'

const CartIcon = () => {
    const { cartDetails } = useShoppingCart()
    const cartItems = Object.values(cartDetails ?? {})
    return (
        <Link href={'/cart'} className="relative">
            <AiOutlineShoppingCart />
            {
                cartItems.length > 0 && (
                    <span className="absolute  left-3 bottom-3 font-bold  bg-gray-900 text-white text-sm rounded-full flex items-center w-4 h-4 justify-center pb-1 ">{cartItems.length}</span>
                )
            }
        </Link>
    )
}

export default CartIcon
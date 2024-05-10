"use client";
import { useState } from "react";
import Image from "next/image";
import { FaHeartCirclePlus, FaEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import { ProductType } from "@/types/ProductTypes";
import AddToCart from "@/app/(shoppingcart)/components/ui/AddToCart";

const ProductsCard = ({
  product,
}: {
  product: ProductType;
}) => {
  const [selectedSize, setSelectedSize] = useState("");

  const isSizeSelected = selectedSize !== "";

  const showToast = () => {
    toast.error("Please choose a size first");
  };
  return (
    <div className="product-card relative flex flex-col items-center border-solid border-2 rounded-md pb-5">
      <div className="top relative group w-full h-80 overflow-hidden">
        <Image
          src={product.image}
          width={320}
          height={320}
          alt={`image of ${product.name}`}
          className="cursor-pointer h-full w-full object-cover transition-all"
          />            

        <div className="hidden absolute top-5 items-center justify-center group-hover:flex flex-col gap-3">
          <button className="mx-2 bg-gray-900 border text-white p-2 rounded-md hover:bg-gray-900/75">
          <FaHeartCirclePlus />

          </button>
          <button className="mx-2 bg-gray-900 border text-white p-2 rounded-md hover:bg-gray-900/75">
            <FaEye />
          </button>
        </div>
      </div>
      <h3 className="font-bold tracking-wide mt-5">
        {product.name}
      </h3>
      <span>{(product.unit_amount)}</span>
      <div className="flex justify-between items-center w-full px-5 mt-5 gap-5">

      <select
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
        className="py-2.5 px-3 border rounded-md w-1/2"
      >
        <option value="">Select Size</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <AddToCart
        name={product.name}
        image={product.image}
        price={product.unit_amount}
        id={product.price_id!}
        sizeSelect={isSizeSelected}
        size={selectedSize}
        onClick={!isSizeSelected ? showToast : undefined}
        currency="USD"
      />
      </div>

    </div>
  );
};

export default ProductsCard;

"use client";

import Image from "next/image";
import React from "react";
import Stripe from "stripe";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

interface ProductDetailProps {
  product: Stripe.Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const price = product.default_price as Stripe.Price;

  // recuperiamo da zustand lo state del carrello
  const { items, addItem, removeItem } = useCartStore();

  // controlliamo se il prodotto corrente esiste nel carrello
  const cardItem = items.find((item) => item.id === product.id);

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  const onRemoveItem = (productId : string) => {
    removeItem(productId);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      {product.images && product.images[0] && (
        <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition duration-300 hover:opacity-90 object-contain"
          />
        </div>
      )}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}
        {price && price.unit_amount && (
          <p className="text-lg font-semibold text-gray-900">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
        <div className="flex items-center space-x-4">
          <Button variant={"outline"} onClick={() => onRemoveItem(product.id)}>
            <Minus></Minus>
          </Button>
          <span className="text-lg font-semibold">
            {cardItem ? cardItem.quantity : 0}
          </span>
          <Button onClick={onAddItem}>
            <Plus></Plus>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

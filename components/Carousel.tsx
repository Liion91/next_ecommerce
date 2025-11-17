"use client";

import React, { useEffect, useState } from "react";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

interface CarouselProps {
  products: Stripe.Product[];
}

const Carousel = ({ products }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // una volta arrivato all'ultimo indice, ritorna al primo senza andare out of range
      setCurrentSlide((prevSlide) => (prevSlide + 1) % products.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [products.length]);

  const currentProduct = products[currentSlide];

  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
      {currentProduct.images && currentProduct.images[0] && (
        <div className="relative h-80 w-full">
          <Image
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            fill            
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition-opacity duration-500 ease-in-out object-contain"
          />
        </div>
      )}
      <CardContent className="inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <CardTitle className="text-3xl font-bold text-gray-700 mb-2">
          {currentProduct.name}
        </CardTitle>
        {price && price.unit_amount && (
          <p className="text-xl text-gray-700">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default Carousel;

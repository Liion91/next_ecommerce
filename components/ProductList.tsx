"use client";

import React, { useState } from "react";
import Stripe from "stripe";
import ProductCard from "./ProductCard";
import { useTranslations } from "next-intl";

interface ProductListProps {
  products: Stripe.Product[];
}

const ProductList = ({ products }: ProductListProps) => {

  const t = useTranslations('ProductsPage');

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descMatch;
  });

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder={t('searchField')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></input>
      </div>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, key) => (
          <li key={key}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

"use server";

import Stripe from "stripe";

type FilterProps = {
  products: Stripe.Product[];
  searchTerm: string;
};

export const filterProducts = async ({ products, searchTerm }: FilterProps) => {
  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descMatch;
  });

  return filteredProducts;
};

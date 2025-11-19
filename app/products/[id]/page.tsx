import ProductDetail from "@/components/ProductDetail";
import { stripe } from "@/lib/stripe";
import { getMessages } from "next-intl/server";
import React from "react";

export async function generateMetadata({
  params: locale,
}: {
  params: { locale: string };
}) {

  const messages = await getMessages(locale);

  const metaTitle = messages.ProductPage?.metaTitle ?? "ProductPage Ecommerce";
  const metaDescription = messages.ProductPage?.metaDescription ?? "ProductPage Ecommerce";

  return {
    title: metaTitle,
    description: metaDescription,
  };
}

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // console.log("ID ->", id);

  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const product = products.data.find((product) => product.id === id);

  // const product = await stripe.products.retrieve(id, {
  //   expand: ["data.default_price"],
  // });

  const plainProduct = JSON.parse(JSON.stringify(product));

  // console.log("Ola", plainProduct);

  return <ProductDetail product={plainProduct} />;
};

export default ProductPage;

import ProductList from "@/components/ProductList";
import { stripe } from "@/lib/stripe";
import { getMessages, getTranslations } from "next-intl/server";
import React from "react";

export async function generateMetadata({
  params: locale,
}: {
  params: { locale: string };
}) {

  const messages = await getMessages(locale);

  const metaTitle = messages.ProductsPage?.metaTitle ?? "ProductsPage Ecommerce";
  const metaDescription = messages.ProductsPage?.metaDescription ?? "ProductsPage Ecommerce";

  return {
    title: metaTitle,
    description: metaDescription,
  };
}

const ProductsPage = async () => {

  const t = await getTranslations("ProductsPage");

  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  return <div>
    <h1>{t('subtitle')}</h1>
    <ProductList products={products.data} />
  </div>;
};

export default ProductsPage;

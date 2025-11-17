"use server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cart-store";
import { redirect } from "next/navigation";

export const checkoutAction = async (formData: FormData): Promise<void> => {
  // gli elementi in formato json recuperati dalla submit del carrello
  const itemsJson = formData.get("items") as string;
  const items = JSON.parse(itemsJson);

  // customizziamo l'item per stripe con le informazioni necessarie
  const line_items = items.map((item: CartItem) => ({
    price_data: {
      currency: "cad",
      product_data: { name: item.name },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    // thank you page
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  });

  // reindirizziamo l'utente al checkout
  redirect(session.url!);
};

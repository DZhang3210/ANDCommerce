import convertToSubcurrency from "@/lib/convertToSubcurrency";
import prisma from "@/libs/db";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { notFound } from "next/navigation";
import React from "react";

type PurchasePageProps = {
  params: {
    productID: string;
  };
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const PurchasePage = async ({ params: { productID } }: PurchasePageProps) => {
  const product = await prisma.product.findUnique({ where: { id: productID } });
  if (!product) notFound();
  return (
    <div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(product?.pricePaidInCents || 0), //cents
          currency: "usd",
        }}
      ></Elements>
    </div>
  );
};

export default PurchasePage;

"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

type PurchasePageProps = {
  params: {
    profileID: string;
  };
};
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const PurchasePage = ({ params: { profileID } }: PurchasePageProps) => {
  return (
    <div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: 100,
          currency: "usd",
        }}
      ></Elements>
    </div>
  );
};

export default PurchasePage;

"use server";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function createPaymentIntent({ amount }: { amount: number }) {
  console.log("amount", amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.log(`Internal Server Error:${error}`);
    return {
      error: `Internal Server Error ${error}`,
      status: 500,
    };
  }
}

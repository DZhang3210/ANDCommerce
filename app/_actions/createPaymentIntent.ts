"use server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type createPaymentIntentProps = {
  amount: number;
  productID: string;
  userID: string;
};

export async function createPaymentIntent({
  amount,
  productID,
  userID,
}: createPaymentIntentProps) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: { productID, userID },
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    // console.log(`Internal Server Error:${error}`);
    return {
      error: `Internal Server Error ${error}`,
      status: 500,
    };
  }
}

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";
import ConfirmEmail from "@/emails/ConfirmEmail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);
export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );
  console.log("ONE");
  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    // console.log("CHARGE", charge);
    const email = charge.billing_details.email;
    console.log("EMAIL", email);
    const pricePaidInCents = charge.amount;
    console.log("TWO");
    if (!email) {
      return new NextResponse();
    }
    console.log("THREE");
    await resend.emails.send({
      from: `Support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Order Confirmation",
      react: ConfirmEmail(),
    });
    console.log("FOUR");
  }
  return new NextResponse();
}

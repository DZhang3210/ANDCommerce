import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";
import ConfirmEmail from "@/email/ConfirmEmail";
import prisma from "@/lib/db";

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
    const [order, product, user] = await Promise.all([
      prisma.order.create({
        data: {
          pricePaidInCents: pricePaidInCents,
          productId: charge.metadata.productID,
          userId: charge.metadata.userID,
        },
      }),
      prisma.product.findUnique({
        where: { id: charge.metadata.productID },
      }),
      prisma.user.findUnique({
        where: { id: charge.metadata.userID },
      }),
    ]);

    if (!product || !user || !order) {
      return;
    }
    console.log("THREE");
    await resend.emails.send({
      from: `Support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Order Confirmation",
      react: ConfirmEmail({ order, product, user }),
    });
    console.log("FOUR");
  }
  return new NextResponse();
}

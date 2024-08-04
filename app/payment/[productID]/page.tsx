// Import necessary modules
import CheckoutWrapper from "@/app/_components/CheckoutWrapper";
import authOptions from "@/libs/authOptions";
import prisma from "@/libs/db";
import { getServerSession } from "next-auth/next"; // Use next-auth/next to import getServerSession
import { notFound } from "next/navigation";
import React from "react";

type PurchasePageProps = {
  params: {
    productID: string;
  };
};

const PurchasePage = async ({ params: { productID } }: PurchasePageProps) => {
  // Fetch the product from the database
  const product = await prisma.product.findUnique({ where: { id: productID } });
  if (!product) notFound(); // Return a 404 if product is not found

  // Fetch the session
  const session = await getServerSession(authOptions);
  // if (!session) notFound(); // Return a 404 if session is not found
  console.log("SESSION", session);

  // Fetch the user ID from the database using the session's email

  // Return the component with product and userID
  return <div>{/* <CheckoutWrapper product={product} /> */}</div>;
};

export default PurchasePage;

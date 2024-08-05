// Import necessary modules
import CheckoutWrapper from "@/app/_components/CheckoutWrapper";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
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
  if (!session) notFound(); // Return a 404 if session is not found
  console.log("SESSION", session);
  const userID = (
    await prisma.user?.findUnique({
      where: { email: session?.user?.email as string },
      select: { id: true },
    })
  )?.id;
  if (!userID) notFound();
  console.log("userID", userID);
  // Fetch the user ID from the database using the session's email

  // Return the component with product and userID
  return (
    <div className="grid grid-cols-2 px-10 container">
      <div className="flex items-center flex-col">
        <h1 className="text-3xl">{product.title}</h1>
        <p className="text-lg">{product.desc}</p>
      </div>
      <CheckoutWrapper product={product} userID={userID} />
    </div>
  );
};

export default PurchasePage;

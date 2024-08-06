// Import necessary modules
import CheckoutWrapper from "@/app/_components/CheckoutWrapper";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { ShoppingCart } from "lucide-react";
import { getServerSession } from "next-auth/next"; // Use next-auth/next to import getServerSession
import Image from "next/image";
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
  const userID = session.user.id;
  if (!userID) notFound();
  console.log("userID", userID);
  // Fetch the user ID from the database using the session's email

  // Return the component with product and userID
  return (
    <div className="container">
      <div className="mb-2 text-4xl flex gap-2 items-center">
        <div>CheckOut</div>
        <ShoppingCart size={40} />
      </div>
      <hr className="mb-10 h-[2px] border-black border-3" />
      <div className="grid grid-cols-2 gap-2 px-10">
        <div className="flex flex-col gap-2">
          {product.productImage === "" ? (
            <div className="bg-black w-3/4 aspect-video"></div>
          ) : (
            <div className="w-3/4 aspect-video">
              <Image
                src={product.productImage}
                alt="product-image"
                height={900}
                width={1600}
                className="w-full h-auto"
              />
            </div>
          )}
          <h1 className="text-3xl">{product.title}</h1>
          <div className="text-lg">{product.desc}</div>
        </div>
        <CheckoutWrapper product={product} userID={userID} />
      </div>
    </div>
  );
};

export default PurchasePage;

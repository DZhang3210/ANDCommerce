// Import necessary modules
import CheckoutWrapper from "@/app/_components/CheckoutWrapper";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { ShoppingCart } from "lucide-react";
import { getServerSession } from "next-auth/next"; // Use next-auth/next to import getServerSession
import Image from "next/image";
import Link from "next/link";
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
  let mustLogin = false;
  const session = await getServerSession(authOptions);
  if (!session) mustLogin = true; // Return a 404 if session is not found

  //   const userID = session.user.id;
  // Fetch the user ID from the database using the session's email

  // Return the component with product and userID
  let truncatedPrice =
    Math.trunc(product.pricePaidInCents * (100 - product.discountInPercent)) /
    100;

  return (
    <div className="container mt-10">
      <div className="mb-2 text-3xl sm:text-4xl flex gap-4 items-center">
        <div className="font-semibold">Checkout</div>
        <ShoppingCart size={40} />
      </div>
      <hr className="mb-10 h-[2px] border-black border-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-2 px-10">
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
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="text-xl indent-2">${truncatedPrice / 100}</div>
          <div className="text-base text-gray-700 max-w-full whitespace-normal overflow-hidden">
            {product.desc}
          </div>
        </div>
        {session ? (
          <CheckoutWrapper product={product} userID={session.user.id} />
        ) : (
          <div className="mb-10">
            <div className="text-5xl font-semibold">Must Sign In First</div>
            <Button asChild className="mt-4">
              <Link href="/signup">Sign In</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasePage;

import DeleteButton from "@/app/_components/DeleteButton";
import StarButton from "@/app/_components/StarButton";
import TagList from "@/app/_components/TagList";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { Product } from "@prisma/client";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type ViewProductPageProps = {
  params: {
    id: string;
  };
};

type Tags = {
  [key: string]: boolean;
};

const ViewProductPage = async ({ params: { id } }: ViewProductPageProps) => {
  const [product, session] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        desc: true,
        pricePaidInCents: true,
        productImage: true,
        owner: true,
        tags: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    }),
    getServerSession(authOptions),
  ]);

  if (!product) notFound();

  const tagList: Record<string, boolean> = product.tags.reduce<Tags>(
    (acc, tag) => {
      acc[tag.title] = true; // Use the title as the key and set the value to true
      return acc;
    },
    {}
  );

  // Check if the product ID is in the user's favorites
  const isFavorite =
    session?.user?.favorites?.some((fav: Product) => fav.id === product.id) ||
    false;

  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
        <div className="overflow-hidden w-full aspect-video">
          {product.productImage === "" ? (
            <div className="bg-black w-3/4 aspect-video"></div>
          ) : (
            <div className="w-full aspect-video">
              <Image
                src={product.productImage}
                alt="product-image"
                height={900}
                width={1600}
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col items-start gap-1 mb-10">
          <div className="flex gap-1 pr-12">
            <div className="text-4xl uppercase font-bold">{product.title}</div>
            <div className="relative translate-y-[-3px]">
              <StarButton productID={product.id} defaultState={isFavorite} />
            </div>
          </div>
          <div>
            <TagList tags={tagList} />
          </div>
          <div className="text-xl">${product.pricePaidInCents / 100}</div>
          <div className="text-2xl text-gray-600 mt-10">{product.desc}</div>
          <Button asChild>
            <Link href={`/payment/${product.id}`} className="w-full text-xl">
              Buy Now
            </Link>
          </Button>
        </div>
      </div>
      {session && session?.user?.id === product?.owner?.id && (
        <div className="mt-5 flex flex-col gap-1 mb-10">
          <Button asChild variant={"outline"}>
            <Link
              href={`/product/${product.id}/edit`}
              className="w-full text-xl mb-2"
            >
              Edit?
            </Link>
          </Button>
          <DeleteButton id={product.id} />
        </div>
      )}
    </div>
  );
};

export default ViewProductPage;

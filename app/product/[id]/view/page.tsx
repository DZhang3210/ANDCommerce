import DeleteButton from "@/app/_components/DeleteButton";
import StarButton from "@/app/_components/StarButton";
import TagList from "@/app/_components/TagList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { Product } from "@prisma/client";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

type ViewProductPageProps = {
  params: {
    id: string;
  };
};

type Tags = {
  [key: string]: boolean;
};

type ProductCardProps = {
  id: string;
  title: string;
  desc: string;
  productImage: string;
  pricePaidInCents: number;
  discountInPercent?: number;
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
        discountInPercent: true,
        productImage: true,
        owner: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
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
  if (!product || !product.owner) notFound();

  const recommendations = await prisma.product.findMany({
    take: 4, // Limit to 4 recommendations
    where: {
      id: {
        not: id, // Exclude the current product by its ID
      },
      owner: {
        id: product.owner.id, // Match products by the same owner
      },
    },
    select: {
      id: true,
      title: true,
      desc: true,
      pricePaidInCents: true,
      discountInPercent: true,
      productImage: true,
    },
  });

  const tagList: Record<string, boolean> = product.tags.reduce<Tags>(
    (acc, tag) => {
      acc[tag.title] = true;
      return acc;
    },
    {}
  );

  const isFavorite =
    session?.user?.favorites?.some((fav: Product) => fav.id === product.id) ||
    false;

  return (
    <div className="container mt-[10rem]">
      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="overflow-hidden w-full aspect-video">
          {product.productImage === "" ? (
            <div className="bg-black w-full aspect-video"></div>
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
        <div className="relative flex flex-col justify-start items-start gap-1 mb-10 w-full">
          <StarButton productID={product.id} defaultState={isFavorite} />
          <div className="flex gap-1 pr-12">
            <div className="text-4xl uppercase font-bold">{product.title}</div>
          </div>
          <div>
            <TagList tags={tagList} />
          </div>
          {product && product?.owner && product?.owner?.image && (
            <Link
              href={`/profile/${product?.owner?.email}/panel`}
              className="group"
            >
              <div className="flex gap-2 items-center my-2">
                <div className="rounded-full overflow-hidden">
                  <Image
                    src={product?.owner?.image}
                    alt={`${product?.owner?.name} Image`}
                    width={45}
                    height={45}
                  ></Image>
                </div>
                <div className="text-xl group-hover:underline line-clamp-1">
                  {product?.owner?.name}
                </div>
              </div>
            </Link>
          )}
          {product.discountInPercent !== 0 ? (
            <div className="flex gap-1 text-xl">
              <div className="line-through">
                ${product.pricePaidInCents / 100}
              </div>
              =&gt;
              <div className="text-blue-800">
                $
                {(
                  (product.pricePaidInCents / 100) *
                  (1 - product.discountInPercent / 100)
                ).toFixed(2)}
              </div>
            </div>
          ) : (
            <div className="text-xl text-blue-800">
              ${product.pricePaidInCents / 100}
            </div>
          )}

          <div className="text-2xl text-gray-600 mt-10 max-w-full whitespace-normal overflow-hidden text-ellipsis">
            {product.desc}
          </div>
          <Button asChild>
            <Link href={`/payment/${product.id}`} className="w-full text-xl">
              Buy Now
            </Link>
          </Button>
        </div>
      </div>

      {/* Owner Information */}
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

      {/* Recommendations Section */}
      <div className="text-lg sm:text-3xl md:text-4xl my-10 font-semibold flex gap-2 items-center">
        <div>More Products By {product.owner.name}</div>
        {product && product?.owner && product?.owner?.image && (
          <Link href={`/profile/${product.owner.email}/panel`}>
            <div className="rounded-full overflow-hidden">
              <Image
                src={product?.owner?.image}
                alt={`${product?.owner?.name} Image`}
                width={50}
                height={50}
                className="h-[50px] w-[50px]"
              />
            </div>
          </Link>
        )}
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10 gap-5">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10 gap-5">
          {recommendations.length > 0 ? (
            recommendations.map((item, i) => (
              <CardComponent key={i} product={item} />
            ))
          ) : (
            <div className="text-3xl whitespace-nowrap">
              No other products by this user...
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
};

const CardComponent = ({ product }: { product: ProductCardProps }) => {
  return (
    <Card className="border-transparent border-4 transition hover:scale-105">
      <div className="aspect-video overflow-hidden border-2 border-black">
        <Link href={`/product/${product.id}/view`}>
          {product.productImage === "" ? (
            <div className="bg-black w-full aspect-video"></div>
          ) : (
            <div className="relative w-full aspect-video overflow-hidden">
              <Image
                src={product.productImage}
                alt="product-image"
                height={900}
                width={1600}
                className="w-full h-auto"
              />
              {product.discountInPercent !== 0 && (
                <div className="absolute bottom-3 left-2 bg-black/80 text-blue-300 rounded-full px-4 py-1">
                  Save {product.discountInPercent}%
                </div>
              )}
            </div>
          )}
        </Link>
      </div>
      <CardHeader>
        <CardTitle>
          <div className="line-clamp-1">{product?.title}</div>
        </CardTitle>
        <CardDescription className="line-clamp-1">
          {product?.desc}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="px-10 py-6 text-xl">
          <Link href={`/product/${product?.id}/view`}>View Product</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const SkeletonCard = () => (
  <div className="border-transparent border-4 transition hover:scale-105 animate-pulse">
    <div className="aspect-video overflow-hidden border-2 border-gray-300 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

export default ViewProductPage;

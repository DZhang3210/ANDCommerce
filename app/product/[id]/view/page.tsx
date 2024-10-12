import DeleteButton from "@/app/_components/DeleteButton";
import ImageCarousel from "@/app/_components/ImageCarousel";
import StarButton from "@/app/_components/StarButton";
import TagList from "@/app/_components/TagList";
import ColorPicker from "@/components/color-picker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
    <div className="container mt-10 ">
      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <ImageCarousel image={product.productImage} />
        <div className="relative flex flex-col justify-start items-start gap-1 mb-10 w-full">
          <StarButton productID={product.id} defaultState={isFavorite} />
          <div className="flex gap-1 pr-12">
            <div className="text-3xl uppercase font-bold">{product.title}</div>
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
          {session && session?.user?.id === product?.owner?.id && (
            <div className="flex gap-1">
              <Button asChild variant={"outline"} className="rounded-xl">
                <Link
                  href={`/product/${product.id}/edit`}
                  className="w-full text-sm "
                >
                  Edit?
                </Link>
              </Button>
              <DeleteButton id={product.id} />
            </div>
          )}
          <Separator className="w-full h-[2px] bg-gray-400" />
          {product.discountInPercent !== 0 ? (
            <div className="flex flex-col gap-1">
              <div className="flex gap-1 text-xl items-center">
                <div className="text-red-600 px-2 py-1 rounded-full text-xl border-2 border-red-300">
                  -{product.discountInPercent}%
                </div>

                <div className="text-2xl">
                  $
                  {(
                    (product.pricePaidInCents / 100) *
                    (1 - product.discountInPercent / 100)
                  ).toFixed(2)}
                </div>
              </div>
              <div className="text-sm">
                List Price:{" "}
                <span className="line-through">
                  ${product.pricePaidInCents / 100}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-xl text-blue-800">
              ${product.pricePaidInCents / 100}
            </div>
          )}

          <ColorPicker />
          {/* Owner Information */}

          <div className="text-lg text-gray-800 mt-5 w-5/6 whitespace-normal overflow-hidden text-ellipsis">
            {product.desc}
          </div>
          <Button asChild>
            <Link href={`/payment/${product.id}`} className="w-1/2 text-xl">
              Buy Now
            </Link>
          </Button>
        </div>
      </div>

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
              <CardComponent key={i} product={item as Product} />
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

const CardComponent = ({ product }: { product: Product }) => {
  return (
    <Card className="border-transparent transition hover:scale-[101%] border-2 border-gray-400 cursor-pointer">
      <div className="aspect-video border-2">
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
          <div className="line-clamp-2 text-lg">{product?.title}</div>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {product?.desc}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          asChild
          className="text-sm w-full rounded-3xl bg-yellow-300 text-black hover:bg-yellow-400 transition"
        >
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

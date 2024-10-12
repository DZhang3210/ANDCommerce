"use server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import prisma from "@/lib/db";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCarousel = async () => {
  const [products] = await Promise.all([prisma.product.findMany({ take: 10 })]);
  return (
    <div className="w-[90%] flex flex-col gap-10 justify-center container">
      <h1 className="text-4xl">Popular Products</h1>
      <div className="flex justify-center">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl"
        >
          <CarouselContent>
            {products.map((product, i) => (
              <CarouselItem
                key={i}
                className="xs:basis-1/2 sm:basis-1/3 md:basis-1/4"
              >
                <CardComponent key={i} product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="h-full w-[40px]" />
          <CarouselNext className="h-full w-[40px]" />
        </Carousel>
      </div>
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

export default ProductCarousel;

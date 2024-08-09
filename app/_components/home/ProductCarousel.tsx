"use server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import Autoplay from "embla-carousel-autoplay";
import prisma from "@/lib/db";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TagList from "../TagList";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import StarButton from "../StarButton";

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
              <CarouselItem key={i} className="sm:basis-1/2 md:basis-1/3">
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

export default ProductCarousel;

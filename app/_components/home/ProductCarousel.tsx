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

const ProductCarousel = async () => {
  const products = await prisma.product.findMany({ take: 10 });
  return (
    <div className="w-full flex justify-center my-20 px-20">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-7xl"
      >
        <CarouselContent>
          {products.map((product, i) => (
            <CarouselItem className="sm:basis-1/2 md:basis-1/3">
              <CardComponent key={i} product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="h-full w-[40px]" />
        <CarouselNext className="h-full w-[40px]" />
      </Carousel>
    </div>
  );
};

const CardComponent = ({ product }: { product: Product }) => {
  return (
    <Card className="">
      <div className="aspect-video overflow-hidden border-4 border-black">
        <Image
          src={product?.productImage}
          alt="profile-name"
          width={1600}
          height={900}
          className="w-full h-auto"
        />
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
        <Button asChild>
          <Link href={`/product/${product?.id}/view`}>View Product</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCarousel;

import DeleteButton from "@/app/_components/DeleteButton";
import TagList from "@/app/_components/TagList";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { faTruckMedical } from "@fortawesome/free-solid-svg-icons";
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
  const session = await getServerSession(authOptions);
  const product = await prisma.product.findUnique({
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
  });
  if (!product) notFound();
  const tagList: Record<string, boolean> = product.tags.reduce<Tags>(
    (acc, tag) => {
      acc[tag.title] = true; // Use the title as the key and set the value to true
      return acc;
    },
    {}
  );
  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-12">
        <div className="overflow-hidden w-full aspect-video">
          <Image
            src={product.productImage}
            alt="product-image"
            width={360}
            height={640}
            className="w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="text-4xl uppercase font-bold">{product.title}</div>
          <div>
            <TagList tags={tagList} />
          </div>
          <div className="text-xl">${product.pricePaidInCents}</div>
          <div className="text-xl text-gray-600 mt-10">{product.desc}</div>
          <Button asChild>
            <Link href={`/payment/${product.id}`} className="w-full">
              Buy Now
            </Link>
          </Button>
        </div>
      </div>
      {session && session?.user?.id === product?.owner?.id && (
        <div className="mt-5 flex flex-col gap-1">
          <Button asChild variant={"outline"}>
            <Link href={`/product/${product.id}/edit`} className="w-full">
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

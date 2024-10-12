import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Tag } from "@prisma/client";
import TagList from "./TagList";
import StarButton from "./StarButton";

type ResultProp = {
  id: string;
  title: string;
  desc: string;
  pricePaidInCents: number;
  discountInPercent: number;
  productImage: string;
  tags: Tag[];
  owner: {
    name: string | null;
    image: string | null;
    id: string | null;
    email: string;
  } | null;
};

type ExtendedSession = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string;
    isAdmin: boolean;
    favorites: ResultProp[]; // Add favorites to the session type
  };
  expires: string;
} | null;

type FeedProps = {
  results: ResultProp[];
  session: ExtendedSession | null;
  removeUser?: boolean;
};

const Feed = ({ results, session, removeUser }: FeedProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-10">
      {results.map((result) => (
        <BlogCard
          key={result.id}
          id={result.id}
          product={result}
          removeUser={removeUser}
          session={session}
        />
      ))}
    </div>
  );
};

type BlogCardProps = {
  id: string;
  product: ResultProp;
  removeUser: boolean | undefined;
  session: ExtendedSession | null;
};
type Tags = {
  [key: string]: boolean;
};

const BlogCard = ({ id, product, removeUser, session }: BlogCardProps) => {
  const tags: Record<string, boolean> = product.tags.reduce<Tags>(
    (acc, tag) => {
      acc[tag.title] = true; // Use the title as the key and set the value to true
      return acc;
    },
    {}
  );

  const isOwner = session?.user?.id === product.owner?.id;
  const isFavorite = session?.user.favorites.some(
    (fav) => fav.id === product.id
  );

  return (
    <Card className="m-0 p-0 transition hover:scale-[101%] border border-transparent hover:border-black cursor-pointer">
      <CardContent className="p-2">
        {product?.productImage ? (
          <div className="relative w-full aspect-video overflow-hidden group border border-black">
            {session && (
              <StarButton productID={product?.id} defaultState={isFavorite} />
            )}
            <Link href={`/product/${id}/view`}>
              <Image
                src={product?.productImage}
                alt="productImage"
                height={180}
                width={320}
                className="w-full h-auto transition group-hover:scale-110"
              />
            </Link>
            {product.discountInPercent !== 0 && (
              <div className="absolute bottom-1 left-2 bg-black/80 text-blue-300 rounded-full px-4 py-1">
                Save {product.discountInPercent}%
              </div>
            )}
          </div>
        ) : (
          <Link href={`/product/${id}/view`}>
            <div className="w-full aspect-video bg-black"></div>
          </Link>
        )}

        <div className="px-3 ">
          <div className="text-xl line-clamp-2 font-semibold text-mainTheme">
            {product.title}
          </div>
          <TagList tags={tags} />
          <div className="my-2">
            {product.discountInPercent !== 0 ? (
              <div className="flex gap-1">
                <div className="line-through">
                  ${product.pricePaidInCents / 100}
                </div>
                =&gt;
                <div>
                  $
                  {(
                    (product.pricePaidInCents / 100) *
                    (1 - product.discountInPercent / 100)
                  ).toFixed(2)}
                </div>
              </div>
            ) : (
              <div className="text-xl font-semibold">
                ${product.pricePaidInCents / 100}
              </div>
            )}
          </div>
          {!removeUser && product?.owner?.image && (
            <>
              <Link
                href={`/profile/${product?.owner?.email}/panel`}
                className="group"
              >
                <div className="flex gap-1 items-center my-2">
                  <div className="rounded-full overflow-hidden h-8 w-8">
                    <Image
                      src={product?.owner?.image}
                      alt={`${product?.owner?.name} Image`}
                      width={35}
                      height={35}
                    ></Image>
                  </div>
                  <div className="text-sm group-hover:underline line-clamp-1">
                    {product?.owner?.name}
                  </div>
                </div>
              </Link>
            </>
          )}
          <div className="text-base text-gray-500 line-clamp-3">
            {product.desc}
          </div>
        </div>
      </CardContent>

      <CardFooter className="space-x-2">
        {session?.user.id !== null && !isOwner && (
          <div className="flex justify-between w-full items-center pr-5">
            <Button
              className="px-10 w-full flex gap-2 rounded-3xl bg-yellow-400 text-black hover:bg-yellow-500"
              asChild
            >
              <Link href={`/payment/${id}`}>Add to cart</Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Feed;

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import { Tag } from "@prisma/client";
import TagList from "./TagList";
import { Star } from "lucide-react";
import StarButton from "./StarButton";

type ResultProp = {
  id: string;
  title: string;
  desc: string;
  pricePaidInCents: number;
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
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
    <Card className="m-0 p-0 transition hover:scale-105 border border-transparent hover:border-black">
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
          </div>
        ) : (
          <Link href={`/product/${id}/view`}>
            <div className="w-full aspect-video bg-black"></div>
          </Link>
        )}

        <div className="px-3 py-2">
          <div className="text-2xl line-clamp-2">{product.title}</div>
          <div className="text-lg text-gray-500 line-clamp-1">
            {product.desc}
          </div>
          <TagList tags={tags} />
          {!removeUser && product?.owner?.image && (
            <>
              <Link
                href={`/profile/${product?.owner?.email}/panel`}
                className="group"
              >
                <div className="flex gap-2 items-center my-2">
                  <div className="rounded-full overflow-hidden">
                    <Image
                      src={product?.owner?.image}
                      alt={`${product?.owner?.name} Image`}
                      width={35}
                      height={35}
                    ></Image>
                  </div>
                  <div className="text-lg group-hover:underline line-clamp-1">
                    {product?.owner?.name}
                  </div>
                </div>
              </Link>
            </>
          )}
        </div>
      </CardContent>

      <CardFooter className="space-x-2">
        {session?.user.id !== null && !isOwner && (
          <div className="flex justify-between w-full items-center pr-5">
            <Button className="px-10 w-full">
              <Link href={`/payment/${id}`}>
                Pay ${product.pricePaidInCents / 100}
              </Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Feed;

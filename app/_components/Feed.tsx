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

type ResultProp = {
  id: string;
  title: string;
  desc: string;
  pricePaidInCents: number;
  productImage: string;
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
  };
  expires: string;
} | null;

type FeedProps = {
  results: ResultProp[];
  session: ExtendedSession | null;
  removeUser?: boolean;
};
const Feed = ({ results, session, removeUser }: FeedProps) => {
  // console.log("result", results);
  // console.log("session", session);
  // console.log("HERE", session ? results[0].owner?.id : null);
  return (
    <div className="grid grid-cols-4 gap-4 my-10">
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

const BlogCard = ({ id, product, removeUser, session }: BlogCardProps) => {
  const isOwner = session?.user?.id === product.owner?.id;
  return (
    <Card className="m-0 p-0 transition hover:scale-105 border border-transparent hover:border-black">
      <CardContent className="p-2">
        {product?.productImage ? (
          <div className="w-full aspect-video overflow-hidden group border border-black">
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
          <div className="text-2xl">{product.title}</div>
          <div className="text-lg text-gray-500">{product.desc}</div>
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
                  <div className="text-lg group-hover:underline">
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

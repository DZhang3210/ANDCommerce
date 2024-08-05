import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

type FeedProps = {
  results: {
    id: string;
    title: string;
    desc: string;
    pricePaidInCents: number;
    owner: {
      name: string | null;
      image: string | null;
      id: string | null;
      email: string;
    } | null;
  }[];
  session: Session | null;
  removeUser?: boolean;
};
const Feed = ({ results, session, removeUser }: FeedProps) => {
  // console.log("result", results);
  // console.log("session", session);
  // console.log("HERE", session ? results[0].owner?.id : null);
  return (
    <div className="grid grid-cols-3 gap-10 my-10">
      {results.map((result) => (
        <BlogCard
          key={result.id}
          isOwner={result.owner?.email === session?.user?.email}
          id={result.id}
          title={result.title}
          email={result?.owner?.email || ""}
          desc={result.desc}
          pricePaidInCents={result.pricePaidInCents}
          username={result.owner?.name}
          image={result.owner?.image}
          userId={session ? result.owner?.id : null}
          removeUser={removeUser}
        />
      ))}
    </div>
  );
};

type BlogCardProps = {
  id: string;
  isOwner: boolean;
  title: string;
  desc: string;
  email: string;
  username: string | null | undefined;
  image: string | null | undefined;
  userId: string | null | undefined;
  pricePaidInCents: number;
  removeUser?: boolean;
};

const BlogCard = ({
  id,
  isOwner,
  title,
  desc,
  username,
  image,
  email,
  userId,
  removeUser = false,
  pricePaidInCents,
}: BlogCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{desc}</p>
        <p>Price: ${pricePaidInCents / 100}</p>
        {!removeUser && (
          <>
            <hr className="my-2" />
            <p>Creator: {username}</p>
            {image && (
              <Link href={`/profile/${email}/panel`}>
                <Image
                  src={image}
                  alt={`${title} Image`}
                  width={40}
                  height={40}
                ></Image>
              </Link>
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="space-x-2">
        {isOwner && (
          <>
            <DeleteButton id={id} />
            <Button asChild>
              <Link href={`/product/${id}`}>Edit</Link>
            </Button>
          </>
        )}
        {userId !== null && !isOwner && (
          <>
            <Button variant={"outline"}>
              <Link href={`/payment/${id}`}>Buy</Link>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default Feed;

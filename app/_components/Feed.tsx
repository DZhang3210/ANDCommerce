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

type FeedProps = {
  id: string;
  title: string;
  desc: string;
  owner: {
    name: string | null;
    image: string | null;
    id: string | null;
  } | null;
}[];
const Feed = ({ results }: { results: FeedProps }) => {
  return (
    <div>
      {results.map((result) => (
        <BlogCard
          key={result.id}
          id={result.id}
          title={result.title}
          desc={result.desc}
          username={result.owner?.name}
          image={result.owner?.image}
          userId={result.owner?.id}
        />
      ))}
    </div>
  );
};

type BlogCardProps = {
  id: string;
  title: string;
  desc: string;
  username: string | null | undefined;
  image: string | null | undefined;
  userId: string | null | undefined;
};

const BlogCard = ({
  id,
  title,
  desc,
  username,
  image,
  userId,
}: BlogCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{desc}</p>
        <p>Creator: {username}</p>
        {image && (
          <Link href={`/profile/${userId}/panel`}>
            <Image
              src={image}
              alt={`${title} Image`}
              width={40}
              height={40}
            ></Image>
          </Link>
        )}
      </CardContent>
      <CardFooter className="space-x-2">
        <DeleteButton id={id} />
        <Button asChild>
          <Link href={`/post/${id}`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Feed;

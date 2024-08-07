import Image from "next/image";
import Feed from "./_components/Feed";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import SearchBar from "./_components/SearchBar";
import { Book } from "lucide-react";

export default async function Home() {
  const results = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      desc: true,
      pricePaidInCents: true,
      productImage: true,
      tags: true,
      owner: {
        select: {
          name: true,
          image: true,
          id: true,
          email: true,
        },
      },
    },
  });
  const session = await getServerSession(authOptions);
  // console.log("SESSION", session);
  return (
    <div className="container mt-10">
      <SearchBar />
      <div className="text-4xl flex gap-4 items-center">
        <span className="font-semibold">Products</span>
        <Book size={40} />
      </div>
      <hr className="mb-10 h-[2px] border-black border-3" />
      <Feed results={results} session={session} />
    </div>
  );
}

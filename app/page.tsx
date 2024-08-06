import Image from "next/image";
import Feed from "./_components/Feed";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import SearchBar from "./_components/SearchBar";

export default async function Home() {
  const results = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      desc: true,
      pricePaidInCents: true,
      productImage: true,
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
      <h1 className="text-4xl">Products</h1>
      <Feed results={results} session={session} />
    </div>
  );
}

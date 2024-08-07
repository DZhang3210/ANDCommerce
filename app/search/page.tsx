import Image from "next/image";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import SearchBar from "../_components/SearchBar";
import Feed from "../_components/Feed";

export default async function BlankSearchPage() {
  const results = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      desc: true,
      pricePaidInCents: true,
      productImage: true,
      tags: {
        select: {
          id: true,
          title: true,
        },
      },
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
  return (
    <div className="container mt-10">
      <SearchBar />
      <h1 className="text-4xl">Products</h1>
      <Feed results={results} session={session} />
    </div>
  );
}

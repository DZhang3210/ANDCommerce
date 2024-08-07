import Image from "next/image";
import Feed from "./_components/Feed";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import SearchBar from "./_components/SearchBar";
import { Book } from "lucide-react";
import Hero from "./_components/home/Hero";
import ProductCarousel from "./_components/home/ProductCarousel";
import EmailPage from "./_components/home/EmailPage";
import PaymentPage from "./_components/home/PaymentPage";
import AuthorizationPage from "./_components/home/AuthorizationPage";

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
    <div className="w-full">
      {/* <SearchBar />
      <div className="text-4xl flex gap-4 items-center">
        <span className="font-semibold">Products</span>
        <Book size={40} />
      </div>
      <hr className="mb-10 h-[2px] border-black border-3" />
      <Feed results={results} session={session} /> */}
      <Hero />
      <ProductCarousel />
      <AuthorizationPage />
      <PaymentPage />
      <EmailPage />
    </div>
  );
}

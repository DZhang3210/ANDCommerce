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
import Categories from "./_components/home/Categories";
import Deals from "./_components/home/Deals";
import SearchHomePage from "./_components/home/SearchHomePage";
import BrandsPage from "./_components/home/BrandsPage";
import BlogPosts from "./_components/home/BlogPosts";

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
      <Categories />
      <Deals />
      <ProductCarousel />
      <BrandsPage />
      <BlogPosts />
    </div>
  );
}

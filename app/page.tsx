import Image from "next/image";
import Feed from "./_components/Feed";
import prisma from "@/libs/db";
import ProductForm from "./_components/ProductForm";

export default async function Home() {
  const results = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      desc: true,
      pricePaidInCents: true,
      owner: {
        select: {
          name: true,
          image: true,
          id: true,
        },
      },
    },
  });
  return (
    <div className="container mt-10">
      <h1 className="text-4xl">Products</h1>
      <Feed results={results} />
      <div>Create a product</div>
      <ProductForm />
    </div>
  );
}

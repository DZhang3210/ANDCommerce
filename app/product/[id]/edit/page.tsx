import ProductForm from "@/app/_components/ProductForm";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { Pencil } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const EditPage = async ({ params: { id } }: { params: { id: string } }) => {
  const post = await prisma.product.findUnique({
    where: { id },
    select: {
      desc: true,
      title: true,
      pricePaidInCents: true,
      productImage: true,
      tags: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  if (!post) {
    redirect("/");
  }
  return (
    <div className="container mt-10">
      <div className="text-4xl flex gap-5 items-center mb-5">
        <span>Edit your blog post</span>
        <Pencil size={45} />
      </div>
      <hr className="mb-10 h-[2px] border-black border-3" />
      <ProductForm
        id={id}
        desc={post.desc}
        title={post.title}
        pricePaidInCents={post.pricePaidInCents}
        productImage={post.productImage}
        defaultTags={post.tags}
      />
    </div>
  );
};

export default EditPage;

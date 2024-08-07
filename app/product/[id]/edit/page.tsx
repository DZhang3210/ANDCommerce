import ProductForm from "@/app/_components/ProductForm";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
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
    <div className="container">
      <div>Edit your blog post</div>
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

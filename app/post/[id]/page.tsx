import ProductForm from "@/app/_components/ProductForm";
import authOptions from "@/libs/authOptions";
import prisma from "@/libs/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const EditPage = async ({ params: { id } }: { params: { id: string } }) => {
  const post = await prisma.product.findUnique({ where: { id } });
  if (!post) {
    redirect("/");
  }
  return (
    <>
      <div>Edit your blog post</div>
      <ProductForm
        id={id}
        desc={post.desc}
        title={post.title}
        pricePaidInCents={post.pricePaidInCents}
      />
    </>
  );
};

export default EditPage;

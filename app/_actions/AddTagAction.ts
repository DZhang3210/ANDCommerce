"use server";

import prisma from "@/lib/db";
import { redirect } from "next/navigation";

type addTagProps = {
  id: string;
  tagTitle: string;
};

export const addTag = async ({ id, tagTitle }: addTagProps) => {
  try {
    let tag = await prisma.tag.findUnique({
      where: { title: tagTitle },
    });
    if (!tag) {
      // If the tag doesn't exist, create a new one
      tag = await prisma.tag.create({
        data: { title: tagTitle },
      });
    }
    // If the tag doesn't exist, create a new one
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        tags: {
          connect: { id: tag.id },
        },
      },
      include: { tags: true },
    });
    return updatedProduct;
  } catch (err) {
    console.error("Error adding tag:", err);
    throw new Error("Failed to add tag");
  }
};

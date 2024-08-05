"use server";

import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { SafeParseError, z } from "zod";

const getSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(4, "Title must be at least 4 characters long"), // Ensures a title is provided
  desc: z
    .string({ message: "Desc is required" })
    .min(4, "Description must be at least 4 characters long"),
  price: z.coerce
    .number({ message: "Price must be a number" })
    .int({ message: "price must be an integer" })
    .min(1, "price must be at least 1 cent"),
});

export const addProduct = async (prevState: unknown, formData: FormData) => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email as string },
  });
  if (!user) return notFound();

  // Convert FormData to a plain object
  const unvalidatedData = {
    title: formData.get("title"),
    desc: formData.get("desc"),
    price: formData.get("price"),
  } as { title: string; desc: string; price: string };

  // Validate data against the schema
  const result = getSchema.safeParse(unvalidatedData);

  // Check if validation succeeded
  if (result.success === false) {
    console.log("Failed", result.error.formErrors.fieldErrors);
    return result.error.formErrors.fieldErrors;
  }

  // Data is valid; proceed to create a new blog post
  try {
    const newPost = await prisma.product.create({
      data: {
        title: unvalidatedData.title,
        desc: unvalidatedData.desc,
        pricePaidInCents: Number(unvalidatedData.price),
        ownerID: user?.id,
      },
    });
    console.log("Product created:", newPost);
    revalidatePath("/");
  } catch (error) {
    console.error("Error creating Product:", error);
  }
  redirect("/");
};

export async function deleteProduct({ id }: { id: string }) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/");
}

const editSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(4, "Title must be at least 4 characters long"), // Ensures a title is provided
  desc: z
    .string({ message: "Desc is required" })
    .min(4, "Description must be at least 4 characters long"),
  price: z.coerce
    .number({ message: "Price must be a number" })
    .int({ message: "price must be an integer" })
    .min(1, "price must be at least 1 cent"),
  id: z.string({ message: "id must be known" }),
});
export async function editProduct(
  prevState: { [key: string]: string[] } | undefined,
  formData: FormData
) {
  // Convert FormData to a plain object
  const unvalidatedData = {
    title: formData.get("title"),
    desc: formData.get("desc"),
    price: formData.get("price"),
    id: formData.get("id"),
  } as { title: string; desc: string; price: string; id: string };
  // Validate data against the schema
  const result = editSchema.safeParse(unvalidatedData);
  // Check if validation succeeded
  if (result.success === false) {
    console.log("Failure to parse, zod errros");
    return result.error.formErrors.fieldErrors;
  }
  // Data is valid; proceed to create a new blog post
  try {
    const newPost = await prisma.product.update({
      where: { id: unvalidatedData.id },
      data: {
        title: unvalidatedData.title,
        desc: unvalidatedData.desc,
        pricePaidInCents: Number(unvalidatedData.price),
      },
    });
    console.log("Product updated:", newPost);
    revalidatePath(`/post/${unvalidatedData.id}`);
    revalidatePath("/");
  } catch (error) {
    console.error("Error updating Product:", error);
  }
  redirect("/");
}

"use server";

import prisma from "@/libs/db";
import { revalidatePath } from "next/cache";

export async function deleteUser({ id }: { id: string }) {
  console.log("ID", id);
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}

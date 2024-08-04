"use server";

import prisma from "@/libs/db";
import { revalidatePath } from "next/cache";

export async function deleteUser({ id }: { id: string }) {
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}

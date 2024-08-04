"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteOrder({ id }: { id: string }) {
  console.log("ID", id);
  await prisma.order.delete({ where: { id } });
  revalidatePath("/admin/orders");
}

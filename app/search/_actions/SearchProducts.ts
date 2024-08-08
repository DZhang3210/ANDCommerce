"use server";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

type SearchProductsProps = {
  keyword?: string | null;
};
export const SearchProducts = async ({ keyword = "" }: SearchProductsProps) => {
  const [results, session] = await Promise.all([
    prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: decodeURIComponent(keyword || ""),
              mode: "insensitive", // Case-insensitive search
            },
          },
          {
            desc: {
              contains: decodeURIComponent(keyword || ""),
              mode: "insensitive", // Case-insensitive search
            },
          },
          {
            owner: {
              name: {
                contains: decodeURIComponent(keyword || ""),
                mode: "insensitive", // Case-insensitive search
              },
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        desc: true,
        pricePaidInCents: true,
        productImage: true,
        tags: {
          select: {
            id: true,
            title: true,
          },
        },
        owner: {
          select: {
            name: true,
            image: true,
            id: true,
            email: true,
          },
        },
      },
    }),
    getServerSession(authOptions),
  ]);
  return [results, session];
};

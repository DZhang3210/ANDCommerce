"use server";

import { getSession } from "next-auth/react";
import prisma from "@/lib/db"; // Adjust the path to your Prisma client
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function toggleFavorite(productId: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("You must be logged in to perform this action.");
  }

  const userId = session.user.id;

  // Check if the product is already in the user's favorites
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { favorites: true },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const isFavorite = user.favorites.some(
    (favorite) => favorite.id === productId
  );

  if (isFavorite) {
    // Remove from favorites
    await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          disconnect: { id: productId },
        },
      },
    });
  } else {
    // Add to favorites
    await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          connect: { id: productId },
        },
      },
    });
  }

  return !isFavorite; // Return the new state
}

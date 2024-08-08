import Feed from "@/app/_components/Feed";
import prisma from "@/lib/db";
import React from "react";
import ProfileOrderTable from "./_components/ProfileOrdersTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Image from "next/image";
import { User } from "lucide-react";
import ProfileManagement from "./_components/ProfileManagement";
import { notFound } from "next/navigation";
import { Tag } from "@prisma/client";

type ProfilePanelProps = {
  params: {
    profileEmail: string;
  };
};

type Tags = {
  [key: string]: boolean;
};

type ResultProp = {
  id: string;
  title: string;
  desc: string;
  pricePaidInCents: number;
  productImage: string;
  tags: Tag[];
  owner: {
    name: string | null;
    image: string | null;
    id: string | null;
    email: string;
  } | null;
};

type ExtendedSession = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string;
    isAdmin: boolean;
    favorites: ResultProp[]; // Add favorites to the session type
  };
  expires: string;
} | null;

const ProfilePanel = async ({
  params: { profileEmail },
}: ProfilePanelProps) => {
  const decodedURI = decodeURIComponent(profileEmail);

  // Fetch user, their products, and the session
  const [userWithOrders, userProducts, session] = await Promise.all([
    prisma.user.findUnique({
      where: { email: decodedURI },
      select: {
        name: true,
        image: true,
        orders: {
          select: {
            id: true,
            pricePaidInCents: true,
            createdAt: true,
            product: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        favorites: {
          select: {
            id: true,
            title: true,
            desc: true,
            pricePaidInCents: true,
            productImage: true,
            tags: true,
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    }),
    prisma.product.findMany({
      where: { owner: { email: decodedURI } },
      select: {
        id: true,
        title: true,
        desc: true,
        pricePaidInCents: true,
        productImage: true,
        tags: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    }),
    getServerSession(authOptions),
  ]);

  if (!userWithOrders) {
    notFound();
  }

  const orders = userWithOrders.orders || [];
  const favoriteProducts = userWithOrders.favorites || [];

  return (
    <div className="container mt-10">
      <div className="text-6xl flex gap-4 items-center">
        <span className="font-semibold">Profile</span>
        <User size={50} />
      </div>
      <hr className="mb-10 h-[2px] border-black border-3" />
      <div className="flex flex-col md:flex-row md:gap-10 mb-10">
        {userWithOrders.image && (
          <div className="rounded-full overflow-hidden aspect-square w-[300px] md:mb-10">
            <Image
              src={userWithOrders.image}
              alt="user-profile"
              width={400}
              height={400}
            />
          </div>
        )}
        <div className="text-4xl">
          <div className="mt-5 md:mt-20 font-semibold">
            {userWithOrders.name}
          </div>
          <div className="text-gray-500 text-[1rem] indent-2 italic">
            @{decodedURI}
          </div>
        </div>
      </div>
      <ProfileManagement
        orders={orders}
        session={session}
        decodedURI={decodedURI}
        products={userProducts}
        favoriteProducts={favoriteProducts}
        profileEmail={profileEmail}
      />
    </div>
  );
};

export default ProfilePanel;

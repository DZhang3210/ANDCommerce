import Feed from "@/app/_components/Feed";
import prisma from "@/lib/db";
import React from "react";
import ProfileOrderTable from "./_components/ProfileOrdersTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Image from "next/image";
import { faTruckMedical } from "@fortawesome/free-solid-svg-icons";

type ProfilePanelProps = {
  params: {
    profileEmail: string;
  };
};

const ProfilePanel = async ({
  params: { profileEmail },
}: ProfilePanelProps) => {
  // console.log("profileID", decodeURIComponent(profileID));
  const decodedURI = decodeURIComponent(profileEmail);
  const [userWithOrders, products, session] = await Promise.all([
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
  const orders = userWithOrders?.orders || [];

  return (
    <div className="container">
      <div className="flex gap-10">
        {userWithOrders?.image && (
          <div className="rounded-full overflow-hidden aspect-square w-1/4 mb-10">
            <Image
              src={userWithOrders?.image}
              alt="user-profile"
              width={400}
              height={400}
            />
          </div>
        )}
        <div className="text-4xl">
          <div className="mt-20 font-semibold">{userWithOrders?.name}</div>
          <div className="text-gray-500 text-[1rem] indent-2 italic">
            @{decodedURI}
          </div>
        </div>
      </div>
      <div className="mb-10 font-semibold">
        <h1 className="text-4xl ml-5">Products</h1>
        <Feed results={products} session={session} removeUser={true} />
      </div>
      <div className="mb-10">
        {session && session.user?.email === decodedURI && (
          <>
            <h1 className="text-4xl ml-5 font-semibold">Orders</h1>
            {orders.length !== 0 ? (
              <ProfileOrderTable orders={orders} />
            ) : (
              <div className="mt-5">You don't have any orders....</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePanel;

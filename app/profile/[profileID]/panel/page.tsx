import Feed from "@/app/_components/Feed";
import prisma from "@/lib/db";
import React from "react";
import ProfileOrderTable from "./_components/ProfileOrdersTable";

type ProfilePanelProps = {
  params: {
    profileID: string;
  };
};

const ProfilePanel = async ({ params: { profileID } }: ProfilePanelProps) => {
  const orders =
    (
      await prisma.user.findUnique({
        where: { id: profileID },
        select: {
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
      })
    )?.orders || [];

  return (
    <div className="container">
      <ProfileOrderTable orders={orders} />
    </div>
  );
};

export default ProfilePanel;

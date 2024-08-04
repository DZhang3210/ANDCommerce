import Feed from "@/app/_components/Feed";
import prisma from "@/libs/db";
import React from "react";

type ProfilePanelProps = {
  params: {
    profileID: string;
  };
};

const ProfilePanel = async ({ params: { profileID } }: ProfilePanelProps) => {
  const results =
    (
      await prisma.user.findUnique({
        where: { id: profileID },
        select: {
          orders: {
            select: {
              pricePaidInCents: true,
              createdAt: true,
              product: {
                select: {
                  title: true,
                  desc: true,
                },
              },
            },
          },
        },
      })
    )?.orders || [];
  // console.log("Results", results)
  return <div>{/* <Feed results={results} /> */}</div>;
};

export default ProfilePanel;

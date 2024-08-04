import Feed from "@/app/_components/Feed";
import prisma from "@/libs/db";
import React from "react";

type ProfilePanelProps = {
  params: {
    profileID: string;
  };
};

const ProfilePanel = async ({ params: { profileID } }: ProfilePanelProps) => {
  // const results =
  //   (
  //   await prisma.user.findUnique({
  //     where: { id: profileID },
  //     select: {
  //       orders: {
  //         select: {
  //           id: true,
  //           desc: true,
  //           pricePaidInCents: true,
  //           createdAt: true,
  //           product: {
  //             select: {
  //               title: true,
  //               desc: true,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   })
  // )?.orders || [];
  return (
    <div>
      {/* <Feed results={results} /> */}
      Orders
    </div>
  );
};

export default ProfilePanel;

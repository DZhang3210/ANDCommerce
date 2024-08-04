import prisma from "@/lib/db";
import React from "react";
import UserTable from "./_components/UserTable";

const UserPage = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      isAdmin: true,
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });
  return (
    <>
      <UserTable users={users} />
    </>
  );
};

export default UserPage;

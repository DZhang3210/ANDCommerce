import prisma from "@/libs/db";
import React from "react";
import OrderTable from "./_components/OrderTable";

const OrderPage = async () => {
  const orders = await prisma.order.findMany({
    select: {
      id: true,
      pricePaidInCents: true,
      createdAt: true,
      User: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return (
    <>
      <OrderTable orders={orders} />
    </>
  );
};

export default OrderPage;

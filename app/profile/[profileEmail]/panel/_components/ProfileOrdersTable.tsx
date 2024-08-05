import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

type OrderType = {
  id: string;
  pricePaidInCents: number;
  createdAt: Date;
  product: {
    id: string;
    title: string;
  };
};

type ProfileOrderTableProps = {
  orders: OrderType[];
};

const ProfileOrderTable = ({ orders }: ProfileOrderTableProps) => {
  return (
    <div className="container">
      <Table>
        <TableCaption>A list of all your orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              id={order.id}
              pricePaidInCents={order.pricePaidInCents}
              createdAt={order.createdAt}
              productName={order.product.title || "(no name)"}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

type OrderRowProps = {
  id: string;
  pricePaidInCents: number;
  createdAt: Date;
  productName: string;
};

export const OrderRow = ({
  id,
  pricePaidInCents,
  createdAt,
  productName,
}: OrderRowProps) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{productName}</TableCell>
      <TableCell>{pricePaidInCents}</TableCell>
      <TableCell>{createdAt.toLocaleDateString("en-US")}</TableCell>
    </TableRow>
  );
};

export default ProfileOrderTable;

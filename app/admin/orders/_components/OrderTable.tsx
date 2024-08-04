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
  User: {
    id: string;
    name: string | null;
    email: string;
  };
};

type OrderTableProps = {
  orders: OrderType[];
};

const OrderTable = ({ orders }: OrderTableProps) => {
  return (
    <div className="container">
      <Table>
        <TableCaption>A list of current orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>UserName</TableHead>
            <TableHead>UserEmail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <OrderRow
              id={order.id}
              pricePaidInCents={order.pricePaidInCents}
              createdAt={order.createdAt}
              userName={order.User.name || "(no name)"}
              userEmail={order.User.email}
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
  userName: string;
  userEmail: string;
};

export const OrderRow = ({
  id,
  pricePaidInCents,
  createdAt,
  userName,
  userEmail,
}: OrderRowProps) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{pricePaidInCents}</TableCell>
      <TableCell>{createdAt.toLocaleDateString("en-US")}</TableCell>
      <TableCell>{userName}</TableCell>
      <TableCell>{userEmail}</TableCell>
    </TableRow>
  );
};

export default OrderTable;

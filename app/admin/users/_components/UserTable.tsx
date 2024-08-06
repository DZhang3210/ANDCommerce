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
import UserSideBar from "./UserSideBar";

type UserType = {
  id: string;
  image: string | null;
  name: string | null;
  _count: {
    orders: number;
  };
  email: string;
  isAdmin: boolean;
};

type UserTableProps = {
  users: UserType[]; // The component expects a users array
};

const UserTable = ({ users }: UserTableProps) => {
  return (
    <div className="container">
      <div className="text-4xl font-semibold">Users</div>
      <Table>
        <TableCaption>A list of current users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>isAdmin</TableHead>
            <TableHead>Num Orders</TableHead>
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: UserType) => (
            <UserRow
              key={user.id}
              id={user.id}
              name={user.name || "(no name)"}
              email={user.email}
              isAdmin={user.isAdmin}
              count={user._count.orders}
            ></UserRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

type UserRowProps = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  count: number;
};
export const UserRow = ({ id, name, email, isAdmin, count }: UserRowProps) => {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{isAdmin}</TableCell>
      <TableCell>{count}</TableCell>
      <TableCell>
        <UserSideBar id={id} email={email} />
      </TableCell>
    </TableRow>
  );
};

export default UserTable;

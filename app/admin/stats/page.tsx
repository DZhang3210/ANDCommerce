import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

const StatsPage = async () => {
  const [users, orders] = await Promise.all([
    prisma.user.findMany(),
    prisma.product.findMany({
      select: { _count: true },
    }),
  ]);
  const [userCount, orderCount] = [users.length, orders.length];
  return (
    <div className="container grid grid-cols-2">
      <StatsCard
        title="Total Users"
        desc="Number of users using site"
        number={userCount}
        units="users"
        linkName="users"
        link="/admin/users"
      />
      <StatsCard
        title="Total Orders"
        desc="Number of orders placed"
        number={orderCount}
        units="orders"
        linkName="orders"
        link="/admin/orders"
      />
    </div>
  );
};

type StatsCardProps = {
  title: string;
  desc: string;
  number: number;
  units: string;
  linkName: string;
  link: string;
};
const StatsCard = ({
  title,
  desc,
  number,
  units,
  linkName,
  link,
}: StatsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {number}&nbsp;{units}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={link}>{linkName}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StatsPage;

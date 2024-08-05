"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminNav = () => {
  const pathname = usePathname();
  // Helper function to apply active class
  const getLinkClassName = (href: string) => {
    const isActive = pathname === href;
    return `flex items-center transition h-full ${
      isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
    }`;
  };
  return (
    <div className="fixed top-20 left-0 right-0 w-full h-12 bg-secondary-foreground flex justify-center text-lg items-center text-white *:px-10 z-[100]">
      <Link href="/admin/stats" className={getLinkClassName("/admin/stats")}>
        Stats
      </Link>
      <Link href="/admin/orders" className={getLinkClassName("/admin/orders")}>
        Order
      </Link>
      <Link href="/admin/users" className={getLinkClassName("/admin/users")}>
        Users
      </Link>
    </div>
  );
};

export default AdminNav;

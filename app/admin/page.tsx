import Link from "next/link";
import React from "react";

const AdminPage = () => {
  return (
    <div className="container">
      <div className="text-4xl mb-5">Admin</div>
      <div className="flex flex-col indent-2 gap-2">
        <Link href="/admin/stats">Stats</Link>
        <Link href="/admin/orders">Orders</Link>
        <Link href="/admin/users">Users</Link>
      </div>
    </div>
  );
};

export default AdminPage;

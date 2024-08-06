import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminNav from "./_components/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log("FIND SESSION", session);
  if (!session) redirect("/");
  if (!session.user.isAdmin) redirect("/");

  return (
    <section>
      <AdminNav />
      <div className="pt-16">{children}</div>
    </section>
  );
}

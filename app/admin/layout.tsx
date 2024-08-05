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
  if (!session) redirect("/");
  const isAdmin = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
    select: { isAdmin: true },
  });
  if (!isAdmin) redirect("/");

  return (
    <section>
      <AdminNav />
      <div className="pt-16">{children}</div>
    </section>
  );
}

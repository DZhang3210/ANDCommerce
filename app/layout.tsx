import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Nav from "./_components/Nav";
import Provider from "./_components/Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import Footer from "./_components/Footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "&Commerce",
  description: "eCommerce Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  let isAdmin = false;
  if (session && session?.user?.email) {
    isAdmin =
      (
        await prisma.user.findUnique({
          where: { email: session?.user?.email },
          select: { isAdmin: true },
        })
      )?.isAdmin || false;
  }

  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/static/favicon.webp" />
      </Head>
      <body className={inter.className}>
        <Provider session={session}>
          <Nav session={session} isAdmin={isAdmin} />
          <div className="min-h-[84vh]">{children}</div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

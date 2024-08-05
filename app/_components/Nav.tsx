"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Nav = () => {
  const { data: session, status } = useSession();

  return (
    <div className="fixed top-0 left-0 right-0 h-[5rem] bg-slate-500 flex gap-10 items-center text-4xl justify-around z-[100]">
      <div className="space-x-10">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/product/create">Create Product</Link>
        </Button>
      </div>

      {!session ? (
        <Button asChild>
          <Link href="/signup">Sign In</Link>
        </Button>
      ) : (
        <div className="flex gap-4 justify-center items-center">
          <div className="font-bold text-accent">
            {session.user?.image ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="outline-none">
                  <button className="rounded-full overflow-hidden group relative">
                    <Image
                      src={session?.user?.image}
                      alt="profile-icon"
                      width={50}
                      height={50}
                      className="transition group-hover:scale-105"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-[110]">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/profile/${session.user.email}/panel`}>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div>Logged In</div>
            )}
          </div>
          <Button onClick={() => signOut()}>Log Out</Button>
        </div>
      )}
    </div>
  );
};

export default Nav;

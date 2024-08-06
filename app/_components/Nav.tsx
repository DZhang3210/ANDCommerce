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
import prisma from "@/lib/db";
import { Ampersand } from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type NavProps = {
  session?: Session | null;
  isAdmin?: boolean;
};

const Nav = ({ session, isAdmin }: NavProps) => {
  console.log("Session", session);
  console.log("isAdmin", isAdmin);
  return (
    <div className="fixed top-0 left-0 right-0 h-[6rem] bg-slate-500 flex gap-10 items-center text-3xl justify-between px-10 z-[100] py-2">
      <Link href="/" className="block">
        <div className="flex items-center gap-1 font-semibold group">
          <div>
            <span className="text-white text-4xl font-bold group-hover:text-blue-800 transition">
              AND
            </span>
            Commerce
          </div>
          <Ampersand
            size={40}
            className="transition group group-hover:scale-105 origin-center"
          />
        </div>
      </Link>

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
                    <Link
                      href={`/profile/${session.user.email}/panel`}
                      className="w-full"
                    >
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem>
                      <Link href={`/admin`} className="w-full">
                        Admin
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div>Logged In</div>
            )}
          </div>
          <Button onClick={() => signOut()}>Log Out</Button>
          <Button asChild variant="outline" className="px-10">
            <Link href="/product/create" className="text-lg">
              Create Product
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Nav;

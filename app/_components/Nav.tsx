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

type NavProps = {
  session?: Session | null;
  isAdmin?: boolean;
};

const Nav = ({ session, isAdmin }: NavProps) => {
  console.log("Session", session);
  console.log("isAdmin", isAdmin);
  return (
    <div className="fixed top-0 left-0 right-0 h-[6rem] bg-[#3B3B46] flex gap-10 items-center text-3xl justify-between px-10 z-[100] py-2">
      <Link href="/" className="block">
        <div className="flex items-center gap-3 font-semibold group">
          <Ampersand
            size={55}
            className="transition group group-hover:scale-105 origin-center text-blue-100"
          />
          <div className="hidden sm:block text-gray-200">
            <span className="text-white text-4xl font-bold group-hover:text-blue-800 transition">
              AND
            </span>
            Commerce
          </div>
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
                  {
                    <div className="block lg:hidden">
                      <DropdownMenuItem>
                        <Button asChild variant="outline" className="px-10">
                          <Link href="/product/create" className="text-lg">
                            Create Product
                          </Link>
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button onClick={() => signOut()} className="w-full">
                          Log Out
                        </Button>
                      </DropdownMenuItem>
                    </div>
                  }
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div>Logged In</div>
            )}
          </div>
          <span className="flex-row gap-3 items-center hidden lg:flex">
            <Button onClick={() => signOut()} className="py-6 text-xl">
              Log Out
            </Button>
            <Button asChild variant="outline" className="px-10 py-6">
              <Link href="/product/create" className="text-xl">
                Create Product
              </Link>
            </Button>
          </span>
        </div>
      )}
    </div>
  );
};

export default Nav;

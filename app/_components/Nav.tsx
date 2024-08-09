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
  console.log("isAdmin", session);
  return (
    <div className="sticky top-0 left-0 right-0 h-[6rem] bg-[#1F2937] flex gap-10 items-center text-3xl justify-between px-10 z-[100] py-2">
      <div className="flex items-center gap-2">
        <Link href="/" className="block">
          <div className="flex items-center gap-3 font-semibold group">
            <Ampersand
              size={55}
              className="transition group group-hover:scale-105 origin-center text-blue-100"
            />
            <div className="hidden md:block text-gray-200">
              {/* <span className="text-white text-4xl font-bold group-hover:text-blue-800 transition">
                AND
              </span> */}
              Commerce
            </div>
          </div>
        </Link>
      </div>
      <Link href="/search">
        <div className="text-2xl px-5 py-2 font-bold text-gray-200 transition hover:text-black bg-slate-500 rounded-2xl hidden sm:block">
          Find Products
        </div>
      </Link>
      {!session ? (
        <Button asChild className="px-10 py-6 text-xl">
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link
                      href={`/profile/${session.user.email}/panel`}
                      className="w-full text-lg"
                    >
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem>
                      <Link href={`/admin`} className="w-full text-lg">
                        Admin
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="block sm:hidden">
                    <Link href="/search" className="w-full text-lg">
                      Find Products
                    </Link>
                  </DropdownMenuItem>
                  {
                    <div className="block md:hidden">
                      <DropdownMenuItem>
                        <Button asChild variant="outline" className="px-10">
                          <Link href="/product/create" className="text-xl">
                            Create Product
                          </Link>
                        </Button>
                      </DropdownMenuItem>
                    </div>
                  }
                  <DropdownMenuItem>
                    <Button
                      onClick={() => signOut()}
                      variant={"destructive"}
                      className="w-full text-lg"
                    >
                      Log Out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div>Logged In</div>
            )}
          </div>
          <span className="flex-row gap-3 items-center hidden lg:flex">
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

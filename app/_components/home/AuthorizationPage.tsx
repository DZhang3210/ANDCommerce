import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthorizationPage = () => {
  return (
    <div className="w-full flex justify-center items-center bg-white rounded-full py-48 flex-col lg:flex-row gap-20 my-10">
      <Image
        src="/NextAuth-logo.png"
        alt="NextAuth-logo"
        width={386}
        height={234}
        className="hidden lg:block px-2"
      />
      <div className="flex flex-col gap-4 items-start px-2">
        <div className="text-4xl max-w-sm font-semibold">
          Authentication w/ NextAuth
        </div>
        <p className="max-w-md">
          Use NextAuth to sign in with alternative providers and keep yourself
          secure
        </p>
        <Button asChild>
          <Link href="https://next-auth.js.org/">View Docs</Link>
        </Button>
      </div>
      <Image
        src="/NextAuth-logo.png"
        alt="NextAuth-logo"
        width={386}
        height={234}
        className="block lg:hidden px-2"
      />
    </div>
  );
};

export default AuthorizationPage;

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EmailPage = () => {
  return (
    <div className="w-full flex justify-center items-center bg-white rounded-full py-48 flex-col lg:flex-row gap-20 my-10">
      <Image
        src="/resend-logo.svg"
        alt="resend-logo"
        width={386}
        height={234}
        className="hidden lg:block px-2"
      />
      <div className="flex flex-col items-start gap-2 px-2">
        <div className="text-4xl max-w-sm font-semibold">
          Confirmation Email w/ Resend
        </div>
        <p className="max-w-md">
          Use Resend combined with react-email to create and build responsive
          confirmation emails
        </p>
        <Button asChild>
          <Link href="https://resend.com/docs/introduction">View Docs</Link>
        </Button>
      </div>
      <Image
        src="/resend-logo.svg"
        alt="resend-logo"
        width={386}
        height={234}
        className="block lg:hidden px-2"
      />
    </div>
  );
};

export default EmailPage;

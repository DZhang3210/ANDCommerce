import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PaymentPage = () => {
  return (
    <div className="w-full flex justify-center items-center bg-white rounded-full py-48 flex-col lg:flex-row gap-10">
      <div className="flex flex-col gap-2 items-start px-5">
        <div className="text-4xl max-w-sm font-semibold">
          Authorized Payment w/ Stripe
        </div>
        <p className="max-w-md">
          Use Stripe to make authorized payments using accepting all payment
          methods
        </p>
        <Button asChild>
          <Link href="https://docs.stripe.com/">View Docs</Link>
        </Button>
      </div>
      <Image
        src="/stripe-logo.jpg"
        alt="stripe-logo"
        width={386}
        height={234}
        className="px-5"
      />
    </div>
  );
};

export default PaymentPage;

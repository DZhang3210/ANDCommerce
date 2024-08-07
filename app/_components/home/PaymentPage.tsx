import Image from "next/image";
import React from "react";

const PaymentPage = () => {
  return (
    <div className="w-full flex justify-center items-center bg-white rounded-full py-48 flex-col lg:flex-row gap-10">
      <div>
        <div className="text-4xl max-w-sm font-semibold">
          Authorized Payment w/ Stripe
        </div>
        <p>
          Use Stripe to make authorized payments using accepting all payment
          methods
        </p>
      </div>
      <Image
        src="/stripe-logo.jpg"
        alt="stripe-logo"
        width={386}
        height={234}
      />
    </div>
  );
};

export default PaymentPage;

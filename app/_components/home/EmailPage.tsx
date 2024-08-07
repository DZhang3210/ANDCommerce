import Image from "next/image";
import React from "react";

const EmailPage = () => {
  return (
    <div className="w-full flex justify-center items-center bg-white rounded-full py-48 flex-col lg:flex-row gap-20 my-10">
      <Image
        src="/resend-logo.svg"
        alt="resend-logo"
        width={386}
        height={234}
        className="hidden lg:block"
      />
      <div>
        <div className="text-4xl max-w-sm font-semibold">
          Confirmation Email w/ Resend
        </div>
        <p>Use Resend to make confirmation emails</p>
      </div>
      <Image
        src="/resend-logo.svg"
        alt="resend-logo"
        width={386}
        height={234}
        className="block lg:hidden"
      />
    </div>
  );
};

export default EmailPage;

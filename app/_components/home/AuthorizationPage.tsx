import Image from "next/image";
import React from "react";

const AuthorizationPage = () => {
  return (
    <div className="w-full flex justify-center items-center bg-white rounded-full py-20 flex-col lg:flex-row gap-20 my-10">
      <Image
        src="/NextAuth-logo.png"
        alt="NextAuth-logo"
        width={386}
        height={234}
        className="hidden lg:block"
      />
      <div>
        <div className="text-4xl max-w-sm font-semibold">
          Authentication w/ NextAuth
        </div>
        <p>
          Use NextAuth to sign in with alternative providers and keep yourself
          secure
        </p>
      </div>
      <Image
        src="/NextAuth-logo.png"
        alt="NextAuth-logo"
        width={386}
        height={234}
        className="block lg:hidden"
      />
    </div>
  );
};

export default AuthorizationPage;

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="relative h-[30rem] w-full overflow-hidden flex justify-center items-center flex-col gap-5 z-[50] bg-gradient-to-b from-[#add8e6] to-[#4682b4]">
      <div className="absolute top-0 left-[100px] text-[20rem] rotate-[40deg] z-[0] text-white">
        &
      </div>
      <div className="absolute top-0 right-[100px] text-[20rem] rotate-[-40deg] z-[0] hidden md:block text-white">
        &
      </div>
      <div className="text-5xl font-semibold z-[1] text-center">
        Buy Your F<span className="text-6xl mt-10">.&.</span>vorite Products
      </div>
      <div className="text-xl text-gray-800 z-[1] px-5">
        We sell everything from toys to knick knacks
      </div>
      <div className="flex gap-2 flex-col sm:flex-row">
        <Button asChild className="rounded-full text-xl z-[1] px-10 py-6">
          <Link href="/search">Browse Products</Link>
        </Button>
        <Button
          className="rounded-full text-xl z-[1] px-10 py-6"
          variant={"outline"}
        >
          <Link href="signup">Sign In</Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;

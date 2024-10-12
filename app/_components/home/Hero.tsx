import React from "react";
import SearchHomePage from "./SearchHomePage";

const Hero = () => {
  return (
    <div className="relative py-10 w-full overflow-hidden flex justify-center items-center flex-col gap-5 z-[50] bg-gradient-to-b from-[#add8e6] to-[#4682b4]">
      <div className="text-5xl font-semibold z-[1] text-center">
        Buy Your F<span className="text-6xl mt-10">.&.</span>vorite Products
      </div>
      <div className="text-xl text-gray-800 z-[1] px-5">
        We sell everything from toys to knick knacks
      </div>
      <SearchHomePage />
    </div>
  );
};

export default Hero;

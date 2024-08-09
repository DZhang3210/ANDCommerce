"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./BrandCarousel.css";

const BrandCarousel = () => {
  const [carouselProgress, setCarouselProgress] = useState(0);

  return (
    <div className="logo-container flex flex-col items-center justify-center w-full h-[10rem] gap-10 mt-10 ">
      <div className="logos w-[90vw]">
        <div className="logos-slide">
          <img src="./logos/3m.svg" alt="logo" />
          <img src="./logos/barstool-store.svg" alt="logo" />
          <img src="./logos/budweiser.svg" alt="logo" />
          <img src="./logos/buzzfeed.svg" alt="logo" />
          <img src="./logos/forbes.svg" alt="logo" />
          <img src="./logos/macys.svg" alt="logo" />
          <img src="./logos/menshealth.svg" alt="logo" />
          <img src="./logos/mrbeast.svg" alt="logo" />
        </div>
        <div className="logos-slide">
          <img src="./logos/3m.svg" alt="logo" />
          <img src="./logos/barstool-store.svg" alt="logo" />
          <img src="./logos/budweiser.svg" alt="logo" />
          <img src="./logos/buzzfeed.svg" alt="logo" />
          <img src="./logos/forbes.svg" alt="logo" />
          <img src="./logos/macys.svg" alt="logo" />
          <img src="./logos/menshealth.svg" alt="logo" />
          <img src="./logos/mrbeast.svg" alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default BrandCarousel;

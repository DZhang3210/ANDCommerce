"use client";
import Image from "next/image";
import React, { useState } from "react";

interface ImageCarouselProps {
  image: string;
}

const ImageCarousel = ({ image }: ImageCarouselProps) => {
  const [selectedColor, setSelectedColor] = useState<string>(image);

  return (
    <div>
      <div className="w-full aspect-video">
        {image === "" ? (
          <div className="bg-black w-full aspect-video"></div>
        ) : (
          <>
            <div className="w-full aspect-video overflow-hidden">
              {selectedColor === image ? (
                <Image
                  src={image}
                  alt="product-image"
                  height={900}
                  width={1600}
                  className="w-full h-auto"
                />
              ) : (
                <div className={`${selectedColor} w-full aspect-video`} />
              )}
            </div>
            <div className="flex gap-1 w-full h-[80px] mt-2 border-4 border-transparent ">
              <div
                className="h-full aspect-square overflow-hidden hover:border-gray-600 border-2 border-transparent cursor-pointer"
                onClick={() => setSelectedColor(image)}
              >
                <Image
                  src={image}
                  alt="product-image"
                  height={80}
                  width={80}
                  className="w-full h-full object-cover"
                />
              </div>
              {[
                "bg-red-500",
                "bg-blue-500",
                "bg-green-500",
                "bg-yellow-500",
              ].map((color) => (
                <div
                  key={color}
                  className={`h-full aspect-square ${color} transition-all hover:border-gray-600 border-2 border-transparent cursor-pointer`}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;

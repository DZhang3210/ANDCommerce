"use client";

import { Star } from "lucide-react";
import React, { useState } from "react";
import { toggleFavorite } from "../_actions/UpdateFavorites";
import { useRouter } from "next/navigation";

type StarButtonProps = {
  productID: string;
  defaultState?: boolean;
};

const StarButton = ({ productID, defaultState }: StarButtonProps) => {
  const [star, setStar] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const router = useRouter();

  const handleToggleFavorite = async () => {
    setIsLoading(true); // Set loading to true
    try {
      setStar((prev) => !prev);
      await toggleFavorite(productID);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    } finally {
      setIsLoading(false); // Set loading to false after operation
      router.refresh();
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleFavorite}
      disabled={isLoading} // Disable button when loading
      className={
        "absolute top-0 right-0 z-[5] transition hover:bg-slate-300/50 p-2 rounded-full " +
        (star ? "text-yellow-300" : "text-mainTheme")
      }
    >
      <div>
        <Star size={25} className="" />
      </div>
    </button>
  );
};

export default StarButton;

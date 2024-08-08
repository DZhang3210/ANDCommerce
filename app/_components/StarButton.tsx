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
      const newState = await toggleFavorite(productID);
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
        "absolute top-1 left-1 z-[5] transition " +
        (star ? "text-yellow-300" : "text-black")
      }
    >
      <div>
        <Star size={35} className="transition hover:scale-110" />
      </div>
    </button>
  );
};

export default StarButton;

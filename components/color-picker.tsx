"use client";
import React, { useState } from "react";

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState<string>("red");
  return (
    <div className="flex gap-2 items-center">
      {/* bg-red-500 */}
      {["red", "green", "blue", "yellow"].map((color) => (
        <div
          key={color}
          className={`bg-${color}-500 h-8 w-8 rounded-full cursor-pointer ${
            selectedColor === color ? "border-2 border-gray-600" : ""
          }`}
          onClick={() => setSelectedColor(color)}
        ></div>
      ))}
      <div className="text-lg font-semibold capitalize">{selectedColor}</div>
    </div>
  );
};

export default ColorPicker;

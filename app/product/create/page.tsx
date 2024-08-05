import ProductForm from "@/app/_components/ProductForm";
import React from "react";

const CreatePage = () => {
  return (
    <div className="container grid grid-cols-2 gap-10">
      <div>
        <div className="text-4xl">Create a product</div>
        <ProductForm />
      </div>
      <div className="w-full aspect-square bg-gray-500"></div>
    </div>
  );
};

export default CreatePage;

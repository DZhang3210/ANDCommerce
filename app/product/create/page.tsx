import ProductForm from "@/app/_components/ProductForm";
import { Pencil } from "lucide-react";
import React from "react";

const CreatePage = () => {
  return (
    <div className="container mt-10">
      <div className="text-3xl flex gap-4 items-center">
        <span className="font-semibold">Create a product</span>
        <Pencil size={25} />
      </div>
      <hr className="mb-10 h-[2px] border-black border-3" />
      <ProductForm />
    </div>
  );
};

export default CreatePage;

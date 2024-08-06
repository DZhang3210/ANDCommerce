import ImageUpload from "@/app/_components/ImageUpload";
import ProductForm from "@/app/_components/ProductForm";
import React from "react";

const CreatePage = () => {
  return (
    <div className="container">
      <div className="text-4xl">Create a product</div>
      <ProductForm />
    </div>
  );
};

export default CreatePage;

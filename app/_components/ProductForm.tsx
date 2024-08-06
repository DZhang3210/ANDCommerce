"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FormEvent, useEffect, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addProduct, editProduct } from "../_actions/BlogFormActions";
import ImageUpload from "./ImageUpload";

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

type ProductFormProps = {
  id?: string;
  desc?: string;
  title?: string;
  pricePaidInCents?: number;
  productImage?: string;
};

const ProductForm = ({
  id,
  desc,
  title,
  pricePaidInCents,
  productImage,
}: ProductFormProps) => {
  const [error, action] = useFormState(
    id && desc && title ? editProduct : addProduct,
    {}
  );
  return (
    <>
      <form action={action}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              defaultValue={title || ""}
              required
            ></Input>
            {error?.title && (
              <div className="text-destructive">{error?.title}</div>
            )}
            <Label htmlFor="desc">Desc</Label>

            <textarea
              id="desc"
              name="desc"
              defaultValue={desc || ""}
              rows={4}
              required
              className="block w-full"
            ></textarea>
            <Label htmlFor="price">Price In Cents</Label>
            <Input
              type="number"
              id="price"
              name="price"
              defaultValue={pricePaidInCents || ""}
              required
            ></Input>
            {error?.desc && (
              <div className="text-destructive">{error?.desc}</div>
            )}
            {id && (
              <input className="hidden" name="id" readOnly value={id}></input>
            )}
          </div>
          <div className="w-full">
            <ImageUpload name="productImage" defaultValue={productImage} />
          </div>
        </div>
        <SubmitButton />
      </form>
    </>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full mt-5">
      Submit your form
    </Button>
  );
};

export default ProductForm;

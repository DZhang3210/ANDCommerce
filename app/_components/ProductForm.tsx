"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FormEvent, useEffect, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addProduct, editProduct } from "../_actions/BlogFormActions";

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

type ProductFormProps = {
  id?: string;
  desc?: string;
  title?: string;
  pricePaidInCents?: number;
};

const ProductForm = ({
  id,
  desc,
  title,
  pricePaidInCents,
}: ProductFormProps) => {
  const [error, action] = useFormState(
    id && desc && title ? editProduct : addProduct,
    {}
  );
  return (
    <>
      <form action={action}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          defaultValue={title || ""}
          required
        ></Input>
        {error?.title && <div className="text-destructive">{error?.title}</div>}
        <Label htmlFor="desc">Desc</Label>
        <Input
          type="text"
          id="desc"
          name="desc"
          defaultValue={desc || ""}
          required
        ></Input>
        <Label htmlFor="price">Price In Cents</Label>
        <Input
          type="number"
          id="price"
          name="price"
          defaultValue={pricePaidInCents || ""}
          required
        ></Input>
        {error?.desc && <div className="text-destructive">{error?.desc}</div>}
        {id && <input className="hidden" name="id" readOnly value={id}></input>}
        <SubmitButton />
      </form>
    </>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      Submit your form
    </Button>
  );
};

export default ProductForm;

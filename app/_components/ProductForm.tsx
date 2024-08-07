"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FormEvent, useEffect, useState, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addProduct, editProduct } from "../_actions/ProductFormActions";
import ImageUpload from "./ImageUpload";
import { Tag } from "@prisma/client";
import TagList from "./TagList";

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

type ProductFormProps = {
  id?: string;
  desc?: string;
  title?: string;
  pricePaidInCents?: number;
  productImage?: string;
  defaultTags?: Tag[];
};

const ProductForm = ({
  id,
  desc,
  title,
  pricePaidInCents,
  productImage,
  defaultTags,
}: ProductFormProps) => {
  const [error, action] = useFormState(
    id && desc && title ? editProduct : addProduct,
    {}
  );
  type Tags = {
    [key: string]: boolean;
  };

  const defaultTagInit = defaultTags?.reduce<Tags>((acc, tag) => {
    acc[tag.title] = true; // Use tag titles as keys with value
    return acc;
  }, {});
  const [tags, setTags] = useState(defaultTagInit || {});
  const [tag, setTag] = useState("");
  const addTag = () => {
    if (tag) {
      setTags((prevTags) => ({ ...prevTags, [tag]: true }));
      setTag(""); // Clear the input field
    }
  };

  return (
    <>
      <form action={action}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-1">
              <Input
                type="text"
                placeholder="tags"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />

              <Button variant="outline" type="button" onClick={addTag}>
                Add Tag
              </Button>
            </div>
            {error?.tags && (
              <div className="text-destructive">{error?.tags}</div>
            )}
            <TagList tags={tags} setTags={setTags} />

            {/* Hidden input to store the tags as a JSON string */}
            <input type="hidden" name="tags" value={JSON.stringify(tags)} />

            {/* Don't touch this, id for editing mode */}
            {id && (
              <input className="hidden" name="id" readOnly value={id}></input>
            )}
          </div>
          <div className="w-full">
            <ImageUpload name="productImage" defaultValue={productImage} />
            {error?.productImage && (
              <div className="text-destructive">{error?.productImage}</div>
            )}
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

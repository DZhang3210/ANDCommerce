"use client";
import { Button } from "@/components/ui/button";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import React, { useRef, useState } from "react";

type ImageUploadProps = {
  name: string;
  icon?: string;
  defaultValue?: string;
};

const ImageUpload = ({ name, icon, defaultValue }: ImageUploadProps) => {
  const fileInRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState(defaultValue || "");
  const [isUploading, setIsUploading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  async function upload(ev: React.ChangeEvent<HTMLInputElement>) {
    const input = ev.target;
    // console.log(input)
    // console.log(input.files)
    if (input.files && input.files.length > 0) {
      setIsUploading(true);
      const file = input.files[0];
      const data = new FormData();
      data.set("file", file);
      const response = await axios.post("/api/upload", data);
      // console.log(response)
      if (response.data.url) {
        setUrl(response.data.url);
        setIsUploading(false);
        setIsImageLoading(true);
      }
    }
  }
  return (
    <div>
      <div className="w-full">
        {/* <Star className='text-gray-400'/> */}
        {/* <icon/> */}
        {(isUploading || isImageLoading) && (
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-gray-400 animate-spin"
          />
        )}
        {!isUploading && url && (
          <div className="w-full flex aspect-video overflow-hidden border-4 border-black">
            <Image
              src={url}
              alt={"uploaded image"}
              width={1024}
              height={1024}
              onLoad={() => setIsImageLoading(false)}
              className="w-full h-auto"
            />
          </div>
        )}
        {!isUploading && !url && (
          <div className="w-full flex aspect-video overflow-hidden border-4 border-black"></div>
        )}
      </div>
      <input type="hidden" value={url} name={name} />
      <div className="mt-2">
        <input
          onChange={upload}
          ref={fileInRef}
          type="file"
          className="hidden"
          required
        />
        <Button
          type="button"
          onClick={() => fileInRef.current?.click()}
          variant="outline"
          className="w-full mt-2 text-xl"
        >
          Select File [Required]
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;

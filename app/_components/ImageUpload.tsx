"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import React, { useRef, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

type ImageUploadProps = {
  name: string;
  defaultValue?: string;
};

const ImageUpload = ({ name, defaultValue }: ImageUploadProps) => {
  const fileInRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState(defaultValue || "");
  const [isUploading, setIsUploading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleUpload(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  async function handleUpload(file: File) {
    setIsUploading(true);
    const data = new FormData();
    data.set("file", file);
    const response = await axios.post("/api/upload", data);
    if (response.data.url) {
      setUrl(response.data.url);
      setIsUploading(false);
      setIsImageLoading(true);
    }
  }

  async function upload(ev: React.ChangeEvent<HTMLInputElement>) {
    const input = ev.target;
    if (input.files && input.files.length > 0) {
      await handleUpload(input.files[0]);
    }
  }

  return (
    <div>
      <div className="w-full" {...getRootProps()}>
        <Label className="text-xl">Profile Image</Label>
        {(isUploading || isImageLoading) && (
          <div className="w-full flex aspect-video overflow-hidden border-4 border-white items-center justify-center">
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-gray-400 animate-spin text-xl"
            />
          </div>
        )}
        {!isUploading && url && (
          <div className="w-full flex aspect-video overflow-hidden border-4 border-black cursor-pointer">
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
        {!(isUploading || isImageLoading) && !url && (
          <div
            className={`w-full flex aspect-video overflow-hidden border-4 border-black items-center justify-center cursor-pointer ${
              isDragActive ? "bg-gray-100" : ""
            }`}
          >
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag and drop some files here, or click to select files</p>
            )}
          </div>
        )}
        <input {...getInputProps({ onChange: upload })} />
      </div>
      <input type="hidden" value={url} name={name} />
      <div className="mt-2">
        <Button
          type="button"
          onClick={() => fileInRef.current?.click()}
          variant="outline"
          className="w-full mt-2 text-xl"
        >
          Select File
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";
import uniqid from "uniqid";

export async function POST(req) {
  console.log("HELLO");
  const data = await req.formData();
  const file = data.get("file");

  const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const newFilename = `${uniqid()}-${file.name}`;

  const chunks = [];
  for await (const chunk of file.stream()) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  const bucketName = "prisma-deploy";

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: newFilename,
      ACL: "public-read",
      Body: buffer,
      ContentType: file.type,
    })
  );
  return Response.json({
    newFilename,
    url: `https://${bucketName}.s3.amazonaws.com/${newFilename}`,
  });
}

import Image from "next/image";
import Feed from "./_components/Feed";
import prisma from "@/libs/db";
import BlogForm from "./_components/BlogForm";

export default async function Home() {
  const results = (await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      desc: true,
      User: {
        select: {
          name: true,
          image: true,
          id: true
        }
      }
    }
  }))
  return (
    <div className="container mt-10">
      <h1 className="text-4xl">
        Blog Posts
      </h1>
      <Feed results={results} />
      <div>
        Make a brand new blog post
      </div>
      <BlogForm />
    </div>
  );
}

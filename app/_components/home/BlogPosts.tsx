import Image from "next/image";
import React from "react";

const BlogPosts = () => {
  return (
    <div className="container my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <h1 className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center text-4xl">
          Blog Posts
        </h1>
        <div className="px-2 pt-2 pb-10 rounded-lg border border-gray-600">
          <div className="w-full aspect-video bg-black overflow-hidden">
            <Image
              src="/ai-blog.png"
              alt="blog-img"
              width={1600}
              height={900}
              className="transition hover:scale-110"
            />
          </div>
          <div className="text-xl uppercase text-gray-600 font-gray-400 font-bold">
            Technology
          </div>
          <p className="text-2xl line-clamp-1">
            The Future of AI: How Machine Learning is Shaping Our World
          </p>
        </div>
        <div className="px-2 pt-2 pb-10 rounded-lg border border-gray-600">
          <div className="w-full aspect-video bg-black overflow-hidden">
            <Image
              src="/mindful-blog.webp"
              alt="blog-img"
              width={1600}
              height={900}
              className="transition hover:scale-110"
            />
          </div>
          <div className="text-xl uppercase text-gray-600 font-gray-400 font-bold">
            Health & Wellness
          </div>
          <p className="text-2xl line-clamp-1">
            10 Mindfulness Practices to Reduce Stress in Your Daily Life
          </p>
        </div>
        <div className="px-2 pt-2 pb-10 rounded-lg border border-gray-600">
          <div className="w-full aspect-video bg-black border-2 overflow-hidden">
            <Image
              src="/underrated-blog.jpg"
              alt="blog-img"
              width={1600}
              height={900}
              className="transition hover:scale-110"
            />
          </div>
          <div className="text-xl text-gray-600 uppercase font-gray-400 font-bold">
            Travel
          </div>
          <p className="text-2xl line-clamp-1">
            Hidden Gems: 5 Underrated Travel Destinations You Need to Visit
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;

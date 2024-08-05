"use client";

import { Button } from "@/components/ui/button";
import { GithubIcon, SearchCheck } from "lucide-react";
import Github from "next-auth/providers/github";
import { signIn } from "next-auth/react";
import React from "react";

const page = () => {
  return (
    <div className="container flex justify-center items-center">
      <div className="flex flex-col gap-5 justify-start items-center">
        <h1 className="text-4xl my-6">Sign In</h1>
        <Button onClick={() => signIn("google")} className="flex gap-2">
          <SearchCheck />
          <span>Sign in With Google</span>
        </Button>
        <div className="flex items-center">
          <hr className="flex-grow h-[2px] border-t border-gray-300" />
          <span>OR</span>
          <hr className="flex-grow h-[2px] border-t border-gray-300" />
        </div>
        <Button onClick={() => signIn("github")} className="flex gap-2">
          <GithubIcon />
          <span>Sign in With Github</span>
        </Button>
      </div>
    </div>
  );
};

export default page;

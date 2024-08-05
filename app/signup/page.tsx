"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

const page = () => {
  return (
    <div className="container flex justify-center items-center">
      <div className="flex flex-col gap-10">
        <h1>Sign In</h1>
        <Button onClick={() => signIn("google")}>Sign in With Google</Button>
        <Button onClick={() => signIn("github")}>Sign in With Github</Button>
      </div>
    </div>
  );
};

export default page;

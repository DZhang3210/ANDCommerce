import React from "react";
import SearchBar from "../SearchBar";
import prisma from "@/lib/db";

const SearchHomePage = async () => {
  const tags = await prisma.tag.findMany();
  return (
    <div className="container flex justify-center">
      <SearchBar tags={tags} />
    </div>
  );
};

export default SearchHomePage;

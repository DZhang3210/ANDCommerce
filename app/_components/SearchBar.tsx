"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type SearchBarProps = {
  kWord?: string;
};

const SearchBar = ({ kWord }: SearchBarProps) => {
  const [keyword, setKeyword] = useState(kWord || "");
  const router = useRouter();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search/${keyword}`); // Redirect to the search page
    }
  };

  return (
    <div className="flex w-1/2 my-4 text-xl items-center border rounded-full px-5 py-2">
      <input
        type="text"
        placeholder="search.."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        className="grow outline-none border-l-4 border-black pl-5"
      />
      <Link href={`/search/${keyword}`}>
        <Search size={40} />
      </Link>
    </div>
  );
};

export default SearchBar;

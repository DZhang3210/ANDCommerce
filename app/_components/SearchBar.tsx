"use client";
import { Tag } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type SearchBarProps = {
  kWord?: string;
  tags: Tag[];
  defaultTags?: string[];
};

const SearchBar = ({ kWord, tags, defaultTags = [] }: SearchBarProps) => {
  const [keyword, setKeyword] = useState(kWord || "");
  const [chosenTags, setChosenTags] = useState<string[]>(defaultTags);
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const slug = chosenTags.join("/");
      const searchKeyword = keyword === "" ? "_ignore" : keyword;
      router.push(`/search/${searchKeyword}/${slug}`); // Redirect to the search page
    }
  };

  return (
    <div>
      <div className="flex w-full lg:w-1/2 my-6 text-xl items-center border rounded-full px-5 bg-white">
        <input
          type="text"
          placeholder="search.."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="grow outline-none border-l-4 border-black pl-5 my-4"
        />
        <Link
          href={`/search/${
            keyword === "" ? "_ignore" : keyword
          }/${chosenTags.join("/")}`}
          className="hidden md:inline-block"
        >
          <Search size={40} />
        </Link>
      </div>
      <TagFilter
        tags={tags}
        chosenTags={chosenTags}
        setChosenTags={setChosenTags}
      />
    </div>
  );
};

type TagFilterProps = {
  tags: Tag[];
  chosenTags: string[];
  setChosenTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const TagFilter = ({ tags, chosenTags, setChosenTags }: TagFilterProps) => {
  return (
    <div className="space-y-2 w-full mb-5">
      {tags.map((tag, i) => (
        <TagButton
          key={i}
          tag={tag}
          chosenTags={chosenTags}
          setChosenTags={setChosenTags}
        />
      ))}
    </div>
  );
};

type TagButtonProps = {
  tag: Tag;
  chosenTags: string[];
  setChosenTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const TagButton = ({ tag, chosenTags, setChosenTags }: TagButtonProps) => {
  const add = chosenTags.includes(tag.title);

  return (
    <button
      type="button"
      className={
        "rounded-full border border-black transition py-2 px-5 mr-2 " +
        (!add
          ? "bg-white text-mainTheme hover:bg-mainTheme hover:text-white"
          : "bg-mainTheme text-white hover:bg-white hover:text-mainTheme")
      }
      onClick={() => handleTag({ add, tag, setChosenTags })}
    >
      <h1>{tag.title}</h1>
    </button>
  );
};

type handleTagProps = {
  add: boolean;
  tag: Tag;
  setChosenTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const handleTag = ({ add, tag, setChosenTags }: handleTagProps) => {
  setChosenTags((prevTags) => {
    if (add) {
      return prevTags.filter((t) => t !== tag.title);
    } else {
      return [...prevTags, tag.title];
    }
  });
};

export default SearchBar;

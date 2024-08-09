"use client";
import { Tag } from "@prisma/client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";

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
      <div className="flex w-full my-6 text-xl items-center border rounded-full px-5 bg-white">
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
        keyword={keyword}
        tags={tags}
        chosenTags={chosenTags}
        setChosenTags={setChosenTags}
        router={router} // Pass the router instance down
      />
    </div>
  );
};

type TagFilterProps = {
  tags: Tag[];
  keyword: string;
  chosenTags: string[];
  setChosenTags: React.Dispatch<React.SetStateAction<string[]>>;
  router: ReturnType<typeof useRouter>; // Define the type for the router
};

const TagFilter = ({
  tags,
  chosenTags,
  keyword,
  setChosenTags,
  router,
}: TagFilterProps) => {
  return (
    <div className="space-y-2 w-full mb-5">
      {tags.map((tag, i) => (
        <TagButton
          key={i}
          keyword={keyword}
          tag={tag}
          chosenTags={chosenTags}
          setChosenTags={setChosenTags}
          router={router} // Pass the router instance down
        />
      ))}
    </div>
  );
};

type TagButtonProps = {
  tag: Tag;
  chosenTags: string[];
  keyword: string;
  setChosenTags: React.Dispatch<React.SetStateAction<string[]>>;
  router: ReturnType<typeof useRouter>; // Define the type for the router
};

const TagButton = ({
  tag,
  chosenTags,
  keyword,
  setChosenTags,
  router,
}: TagButtonProps) => {
  const add = chosenTags.includes(tag.title);

  return (
    <button
      type="button"
      className={
        "rounded-full border border-black transition py-2 px-5 mr-2 " +
        (!add
          ? "bg-white text-mainTheme hover:bg-black hover:text-white"
          : "bg-black text-white hover:bg-white hover:text-mainTheme")
      }
      onClick={() =>
        handleTag({ add, tag, chosenTags, keyword, setChosenTags, router })
      }
    >
      <h1>{tag.title}</h1>
    </button>
  );
};

type handleTagProps = {
  add: boolean;
  tag: Tag;
  keyword: string;
  chosenTags: string[];
  setChosenTags: React.Dispatch<React.SetStateAction<string[]>>;
  router: ReturnType<typeof useRouter>; // Add the router as a prop
};

const handleTag = ({
  add,
  tag,
  keyword,
  chosenTags,
  setChosenTags,
  router,
}: handleTagProps) => {
  const newTags = add
    ? chosenTags.filter((t) => t !== tag.title)
    : [...chosenTags, tag.title];

  // Set the new state
  setChosenTags(newTags);

  const slug = newTags.join("/");
  console.log("keyword", keyword);

  // Use searchKeyword that defaults to "_ignore" if keyword is empty
  const searchKeyword = keyword === "" ? "_ignore" : keyword;
  const d = `/search/${searchKeyword}/${slug}`;
  console.log("PUSH ROUTER", d);

  // Use searchKeyword in router.push
  router.push(d);
};

export default SearchBar;

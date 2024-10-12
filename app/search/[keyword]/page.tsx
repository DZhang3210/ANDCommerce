import Image from "next/image";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Feed from "@/app/_components/Feed";
import SearchBar from "@/app/_components/SearchBar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type SearchPageProps = {
  params: {
    keyword: string;
  };
};

export default async function SearchPage({
  params: { keyword },
}: SearchPageProps) {
  let decodedKeyword =
    decodeURIComponent(keyword) === "_ignore"
      ? ""
      : decodeURIComponent(keyword);

  const [results, session, tags] = await Promise.all([
    prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: decodedKeyword,
              mode: "insensitive", // Case-insensitive search
            },
          },
          {
            desc: {
              contains: decodedKeyword,
              mode: "insensitive", // Case-insensitive search
            },
          },
          {
            owner: {
              name: {
                contains: decodedKeyword,
                mode: "insensitive", // Case-insensitive search
              },
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        desc: true,
        pricePaidInCents: true,
        discountInPercent: true,
        productImage: true,
        tags: {
          select: {
            id: true,
            title: true,
          },
        },
        owner: {
          select: {
            name: true,
            image: true,
            id: true,
            email: true,
          },
        },
      },
      take: 20,
    }),
    getServerSession(authOptions),
    prisma.tag.findMany(),
  ]);
  return (
    <div className="container mt-10">
      <SearchBar kWord={decodeURIComponent(decodedKeyword)} tags={tags} />
      <h1 className="text-4xl">Filter Products&nbsp;({results.length})</h1>
      <Feed results={results} session={session} />
      <Pagination className="my-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="text-xl">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

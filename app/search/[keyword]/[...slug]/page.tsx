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
    slug: string[];
  };
};

export default async function SearchPage({
  params: { keyword, slug },
}: SearchPageProps) {
  let decodedKeyword =
    decodeURIComponent(keyword) === "_ignore"
      ? ""
      : decodeURIComponent(keyword);
  const decodedSlug = slug.map((tag) => decodeURIComponent(tag).toLowerCase());

  try {
    const [results, session, tags] = await Promise.all([
      prisma.product.findMany({
        where: {
          AND: [
            {
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
            {
              tags: {
                some: {
                  title: {
                    in: decodedSlug,
                    mode: "insensitive", // Case-insensitive search
                  },
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
      }),
      getServerSession(authOptions),
      prisma.tag.findMany(),
    ]);
    const filteredResults = results.filter((product) => {
      const productTags = product.tags.map((tag) => tag.title.toLowerCase());
      return decodedSlug.every((tag) => productTags.includes(tag));
    });

    return (
      <div className="container mt-10">
        <SearchBar
          kWord={decodedKeyword}
          tags={tags}
          defaultTags={decodedSlug}
        />
        <h1 className="text-4xl">
          Filter Products&nbsp;({filteredResults.length})
        </h1>
        <Feed results={filteredResults} session={session} />
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
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="container mt-10">
        <h1 className="text-4xl">Error loading products</h1>
      </div>
    );
  }
}

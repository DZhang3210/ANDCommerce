import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Feed from "@/app/_components/Feed";
import SearchBar from "@/app/_components/SearchBar";
import {
  Pagination,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink,
  PaginationPrevious,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

type SearchPageProps = {
  params: {
    keyword: string;
    page: string;
    slug: string[];
  };
};

export default async function SearchPage({
  params: { keyword, page, slug },
}: SearchPageProps) {
  let decodedKeyword =
    decodeURIComponent(keyword) === "_ignore"
      ? ""
      : decodeURIComponent(keyword);
  const decodedSlug = slug.map((tag) => decodeURIComponent(tag).toLowerCase());
  const currentPage = parseInt(page, 10) || 1;
  const itemsPerPage = 10;

  try {
    const [results, session, tags, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  title: {
                    contains: decodedKeyword,
                    mode: "insensitive",
                  },
                },
                {
                  desc: {
                    contains: decodedKeyword,
                    mode: "insensitive",
                  },
                },
                {
                  owner: {
                    name: {
                      contains: decodedKeyword,
                      mode: "insensitive",
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
                    mode: "insensitive",
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
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      getServerSession(authOptions),
      prisma.tag.findMany(),
      prisma.product.count({
        where: {
          AND: [
            {
              OR: [
                {
                  title: {
                    contains: decodedKeyword,
                    mode: "insensitive",
                  },
                },
                {
                  desc: {
                    contains: decodedKeyword,
                    mode: "insensitive",
                  },
                },
                {
                  owner: {
                    name: {
                      contains: decodedKeyword,
                      mode: "insensitive",
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
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
      <div className="container mt-10">
        <SearchBar
          kWord={decodedKeyword}
          tags={tags}
          defaultTags={decodedSlug}
        />
        <h1 className="text-4xl">Filter Products&nbsp;({totalCount})</h1>
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
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="container mt-10">
        <h1 className="text-4xl">Error loading products</h1>
      </div>
    );
  }
}

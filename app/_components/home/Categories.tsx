import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Activity,
  Armchair,
  Baby,
  Bike,
  Book,
  Briefcase,
  Camera,
  Car,
  Dumbbell,
  Flower2,
  Gamepad,
  Globe,
  Heart,
  Home,
  LucideProps,
  Music,
  PawPrint,
  Shirt,
  ShoppingCart,
  Smartphone,
  Watch,
} from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

const Categories = () => {
  const categories = [
    { title: "Electronics", logo: <Smartphone /> },
    { title: "Fashion", logo: <Shirt /> },
    { title: "Home", logo: <Home /> },
    { title: "Beauty", logo: <Heart /> },
    { title: "Sports", logo: <Bike /> },
    { title: "Toys & Games", logo: <Gamepad /> },
    { title: "Automotive", logo: <Car /> },
    { title: "Books", logo: <Book /> },
    { title: "Music", logo: <Music /> },
    { title: "Groceries", logo: <ShoppingCart /> },
    { title: "Jewelry", logo: <Watch /> },
    { title: "Office", logo: <Briefcase /> },
    { title: "Pet", logo: <PawPrint /> },
    { title: "Baby", logo: <Baby /> },
    { title: "Fitness", logo: <Dumbbell /> },
    { title: "Travel", logo: <Globe /> },
    { title: "Furniture", logo: <Armchair /> },
    { title: "Photography", logo: <Camera /> },
    { title: "Gardening", logo: <Flower2 /> },
  ];

  return (
    <div className="container flex justify-center flex-col mb-40 mt-10">
      <h1 className="text-4xl">Categories</h1>
      <Carousel className="flex justify-center gap-20 py-10">
        <CarouselContent className="flex gap-5 py-5 px-10">
          {categories.map((item, i) => (
            <CategoryCard key={i} item={item} />
          ))}
        </CarouselContent>
        <CarouselPrevious className="h-[60px] w-[60px]" />
        <CarouselNext className="h-[60px] w-[60px]" />
      </Carousel>
    </div>
  );
};

type CategoryCardProps = {
  item: {
    title: string;
    logo: ReactNode;
  };
};
const CategoryCard = ({ item }: CategoryCardProps) => {
  return (
    <Link
      href={`/search/${item.title}`}
      className="px-10 border-2 rounded flex justify-center transition hover:border-blue-500 hover:scale-105"
    >
      <div className="text-xl py-5 flex items-center gap-4 justify-center">
        <div className="rounded-full p-2 bg-white">{item.logo}</div>
        <div>{item.title}</div>
      </div>
    </Link>
  );
};

export default Categories;

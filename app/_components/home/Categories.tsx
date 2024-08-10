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
    { title: "Electronics", logo: <Smartphone />, link: "tech" },
    { title: "Fashion", logo: <Shirt />, link: "fashion" },
    { title: "Home", logo: <Home />, link: "home" },
    { title: "Beauty", logo: <Heart />, link: "beauty" },
    { title: "Sports", logo: <Bike />, link: "sports" },
    { title: "Toys & Games", logo: <Gamepad />, link: "games" },
    { title: "Automotive", logo: <Car />, link: "" },
    { title: "Books", logo: <Book />, link: "" },
    { title: "Music", logo: <Music />, link: "" },
    { title: "Groceries", logo: <ShoppingCart />, link: "" },
    { title: "Jewelry", logo: <Watch />, link: "" },
    { title: "Office", logo: <Briefcase />, link: "" },
    { title: "Pet", logo: <PawPrint />, link: "pet" },
    { title: "Baby", logo: <Baby />, link: "" },
    { title: "Fitness", logo: <Dumbbell />, link: "sports" },
    { title: "Travel", logo: <Globe />, link: "" },
    { title: "Furniture", logo: <Armchair />, link: "" },
    { title: "Photography", logo: <Camera />, link: "" },
    { title: "Gardening", logo: <Flower2 />, link: "gardening" },
  ];

  return (
    <div className="container flex justify-center flex-col">
      <Carousel className="flex justify-center gap-20 py-5">
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
    link: string;
  };
};
const CategoryCard = ({ item }: CategoryCardProps) => {
  return (
    <Link
      href={`/search/_ignore/${item.link}`}
      className="px-10 border-2 rounded-3xl flex justify-center transition hover:border-blue-500 hover:scale-105 border-gray-500"
    >
      <div className="text-xl py-5 flex items-center gap-4 justify-center">
        <div className="rounded-full p-2 bg-white">{item.logo}</div>
        <div>{item.title}</div>
      </div>
    </Link>
  );
};

export default Categories;

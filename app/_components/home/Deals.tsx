import Image from "next/image";
import Link from "next/link";
import React from "react";

const Deals = () => {
  const deals = [
    {
      title: "New Deals at Best Prices",
      desc: "From $40.00",
      image: "/headphone-deal.png",
      background: "#E9D7C7",
      link: "/search",
      linkText: "Browse Deals",
    },
    {
      title: "Colorful Redmi Note 6 Pro",
      desc: "From $40.00",
      image: "/phone-deal.png",
      background: "#9AC5E2",
      link: "/search",
      linkText: "Shop Cellphone",
    },
    {
      title: "1000 mAH Power Bank",
      desc: "From $40.00",
      image: "/external-battery.png",
      background: "#000000",
      link: "/search",
      linkText: "Shop Now",
      whiteText: true,
    },
  ];
  return (
    <div className="container">
      <div className="text-4xl mb-5">Deals</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {deals.map((item, i) => {
          return <DealsCard item={item} key={i} />;
        })}
      </div>
    </div>
  );
};

type DealsCardProps = {
  item: {
    title: string;
    desc: string;
    image: string;
    background: string;
    link: string;
    linkText: string;
    whiteText?: boolean;
  };
};

const DealsCard = ({ item }: DealsCardProps) => {
  return (
    <Link href={item.link}>
      <div
        className={`relative h-[280px] flex flex-col justify-between p-5 rounded-2xl group cursor-pointer`}
        style={{
          backgroundColor: item.background,
          color: item.whiteText ? "white" : "black",
        }}
      >
        <div className="z-[10]">
          <div className="text-2xl font-bold mb-3">{item.title}</div>
          <div className="text-xl font-semibold">{item.desc}</div>
        </div>
        <div className="text-lg font-semibold">{item.linkText}</div>
        <Image
          src={item.image}
          alt="image"
          width={830}
          height={950}
          className="absolute w-1/2 right-1 top-0 md:top-20 transition group-hover:scale-110"
        />
      </div>
    </Link>
  );
};

export default Deals;

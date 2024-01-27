import React from "react";
import { Arrow, Direction, Location } from "../icons";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";

interface IFoodCard {
  img: StaticImageData | string;
  title: string;
  location: string;
  isMarket: boolean;
  link: string;
}

const FoodCard: React.FC<IFoodCard> = ({
  img,
  title,
  location,
  isMarket,
  link,
}) => {
  return (
    <div className="relative w-full overflow-hidden rounded-md border border-[#E5E7EB] lg:max-w-[30%]">
      <div className="relative h-[200px]">
        <Image
          src={img}
          alt="img"
          fill
          className="h-full w-full object-cover"
        />
      </div>
      <div className="px-2 pb-20 pt-2 ">
        <div
          className={`mb-3 mt-2 inline-block rounded-[7px] ${
            isMarket ? "bg-[#DCFCE7]" : "bg-[#DDD6FE]"
          } px-2 py-1 text-xs text-[#374151]`}
        >
          <h3>{isMarket ? "Market" : "Restaurant"}</h3>
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="mt-2 flex items-center gap-1 rounded-[7px] px-[8px] py-[6px] text-[#374151]">
          <Location />
          <p className="text-[10px]">{location}</p>
        </div>
      </div>
      <a
        href={link}
        target="__blank"
        className="absolute bottom-0 left-0 flex w-full items-center justify-center gap-2 bg-[#FEF3C7] py-3 text-[#D97706]"
      >
        <Direction /> Show me the directions
      </a>
    </div>
  );
};

export default FoodCard;

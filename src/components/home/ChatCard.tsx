import React from "react";
import { Arrow } from "../icons";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";

interface IChatCard {
  img: StaticImageData;
  title: string;
  description: string;
}

const ChatCard: React.FC<IChatCard> = ({ img, title, description }) => {
  const router = useRouter();
  return (
    <div className="relative w-full overflow-hidden rounded-md border border-[#E5E7EB]">
      <div className="h-[140px]">
        <Image src={img} alt="img" className="h-full w-full" />
      </div>
      <div className="px-2 pb-20 pt-2 lg:pb-24">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-[#4B5563]">{description}</p>
      </div>
      <button
        onClick={() => router.push("/chat")}
        className="absolute bottom-0 left-0 flex w-full items-center justify-center gap-2 bg-[#FEF3C7] py-3 text-[#D97706]"
      >
        Start my conversation <Arrow />
      </button>
    </div>
  );
};

export default ChatCard;

import React from "react";
import { Arrow } from "../icons";

interface ISeeMoreBtn {
  text: string;
}

const SeeMoreBtn: React.FC<ISeeMoreBtn> = ({ text }) => {
  return (
    <button className=" flex items-center justify-center gap-2 border border-[#D97706] px-5 py-[14px] text-[#D97706]">
      {text} <Arrow />
    </button>
  );
};

export default SeeMoreBtn;

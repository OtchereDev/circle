import React from "react";
import Image from "next/image";
import Logo from "~/assets/images/Circle.png";

const Footer = () => {
  return (
    <div className="flex w-full flex-col bg-white px-4 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-5">
      <div>
        <Image src={Logo} alt="Logo" className="w-[25%] lg:w-[60%]" />
      </div>

      <div className="mt-8 flex flex-col gap-3 text-[#6B7280] lg:mt-0 lg:flex-row lg:gap-8">
        <p className="cursor-pointer">Home</p>

        <p className="cursor-pointer">Job Board</p>

        <p className="cursor-pointer">Food</p>

        <p className="cursor-pointer">Blog</p>
      </div>

      <div className="mt-3 flex flex-col gap-3 text-[#6B7280] lg:mt-0 lg:flex-row lg:gap-8">
        <p className="cursor-pointer">Instagram</p>
        <p className="cursor-pointer">Twitter</p>
        <p className="cursor-pointer">Email</p>
      </div>
    </div>
  );
};

export default Footer;

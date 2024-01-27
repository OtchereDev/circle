import Image from "next/image";
import React from "react";
import Logo from "~/assets/images/Circle.png";
import { ToggleBar } from "../icons";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const NavBar = () => {
  const { user } = useUser();

  return (
    <div className="fixed left-0 top-0 z-10 flex w-full items-center justify-between border-b border-[#F3F4F6] bg-[#ffffff] px-4 py-5 lg:px-16 lg:py-5">
      <div>
        <Image src={Logo} alt="Logo" className="w-[50%] lg:w-[60%]" />
      </div>

      <div className="hidden lg:flex lg:gap-8 lg:text-[#6B7280]">
        <Link href={"/"}>
          <div>
            <p>Home</p>
          </div>
        </Link>
        <Link href={"/#jobs"}>
          <div>
            <p>Job Board</p>
          </div>
        </Link>
        <Link href={"/food"}>
          <div>
            <p>Food</p>
          </div>
        </Link>
        <Link href={"/#education"}>
          <div>
            <p>Education</p>
          </div>
        </Link>
      </div>

      <div className="hidden lg:flex lg:items-center lg:gap-4">
        {!user && (
          <>
            <Link
              href={"/api/auth/login"}
              className="cursor-pointer font-medium text-[#D97706]"
            >
              Log in
            </Link>
            <Link
              href={"/api/auth/signup"}
              className="bg-[#D97706] px-3 py-2.5 text-white"
            >
              Create a free account
            </Link>
          </>
        )}

        {user && (
          <>
            <p>{user?.name}</p>
            <Link
              href={"/api/auth/logout"}
              className="bg-[#D97706] px-3 py-2.5 text-white"
            >
              Logout
            </Link>
          </>
        )}
      </div>

      <div className=" lg:hidden">
        <ToggleBar className="cursor-pointer" />
      </div>
    </div>
  );
};

export default NavBar;

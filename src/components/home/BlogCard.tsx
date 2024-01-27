import Image from "next/image";
import React from "react";
import BlogImg from "~/assets/images/blog.png";
import { Arrow } from "../icons";
import Link from "next/link";
import { shortenText } from "~/utils/shortenText";

interface BlogCard {
  blog: {
    id: string;
    title: string;
    image: string;
    description: string | undefined;
  };
}

const BlogCard: React.FC<BlogCard> = ({ blog }) => {
  return (
    <div className="w-full lg:max-w-[290px]">
      <div className="relative h-[177px] overflow-hidden rounded-md">
        <Image
          className="h-full w-full object-cover"
          src={blog.image}
          fill
          alt="Women having legal conversation"
        />
      </div>
      <div>
        <p className="mt-5 inline-block rounded-[7px] bg-[#F3F4F6] px-2 py-1 text-xs text-[#374151]">
          Legal Guidance
        </p>

        <h3 className="mt-2 font-semibold text-[#374151]">
          {shortenText(blog.title, 30)}
        </h3>

        <p className="mt-2 text-[#4B5563]">
          {shortenText(blog.description as string, 100)}
        </p>
        <Link href={`/blog/${blog.id}`}>
          <button className="mt-6 flex w-full items-center justify-center gap-2 border border-[#D97706] py-3 text-[#D97706]">
            Read more <Arrow />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;

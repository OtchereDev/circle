import ChatCard from "~/components/home/ChatCard";
import MainLayout from "~/layout/MainLayout";
import Img1 from "~/assets/images/right-1.png";
import Img2 from "~/assets/images/right-2.png";
import Img3 from "~/assets/images/right-3.png";

import { api } from "~/utils/api";
import JobCard from "~/components/home/JobCard";
import Select from "~/components/shared/Select";
import FoodCard from "~/components/home/FoodCard";
import SeeMoreBtn from "~/components/shared/SeeMoreBtn";
import BlogCard from "~/components/home/BlogCard";
import { Foods } from "~/constants";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const Helps = [
  {
    title: "Legal Guidance",
    description:
      "Start an interactive conversation with our AI with regards to all legal questions you may have",
    img: Img1,
  },
  {
    title: "Knowing My Rights",
    description:
      "Interact with our chatbot about their legal rights and responsibilities in your host country, such as asylum processes, work permits, and residency requirements",
    img: Img2,
  },
  {
    title: "Legal Document Assistance",
    description:
      "Use our chatbot to help you fill out necessary legal documents or forms, guiding you through the process step-by-step.",
    img: Img3,
  },
];

const Jobs = [
  {
    title: "Plumber needed immediately",
    wage: "9.00",
    description:
      "I need an experienced plumber to fix some kitchen sink issues",
    location: "London Heights",
    createdAt: "Posted Yesterday",
  },
  {
    title: "I need an electrician",
    wage: "9.00",
    description:
      "I need an experienced plumber to fix some kitchen sink issues",
    location: "London Heights",
    createdAt: "Posted Yesterday",
  },
  {
    title: "I need an electrician",
    wage: "9.00",
    description:
      "I need an experienced plumber to fix some kitchen sink issues",
    location: "London Heights",
    createdAt: "Posted Yesterday",
  },
];

export default function Home() {
  const { user } = useUser();
  const { data } = api.post.getPosts.useQuery();
  return (
    <MainLayout>
      <div className=" my-container pt-4 lg:pt-10">
        <p className="text-sm lg:text-lg">
          Welcome{" "}
          {user && <span className="hidden lg:inline-block">{user.name}</span>}{" "}
          👋
        </p>
        <h2 className="mt-1 text-2xl font-semibold lg:mt-2 lg:text-3xl">
          What do you need help with today?
        </h2>

        <div className="mt-8 flex flex-col gap-7 lg:flex-row ">
          {Helps.map((help) => (
            <ChatCard
              key={help.title}
              img={help.img}
              title={help.title}
              description={help.description}
            />
          ))}
        </div>
      </div>

      <div id={"jobs"} className="my-container mt-10 bg-[#f9fafb] py-8">
        <h2 className="text-center text-lg font-semibold lg:text-2xl">
          Find jobs to help get on your feet
        </h2>

        <div className="mt-5 flex flex-col gap-4 lg:mt-8 lg:flex-row lg:justify-center">
          {Jobs.map((job, idx) => (
            <JobCard
              key={idx}
              title={job.title}
              wage={job.wage}
              description={job.description}
              createdAt={job.createdAt}
              location={job.location}
            />
          ))}
        </div>

        <div className="mb-8 mt-10 flex items-center justify-center">
          <SeeMoreBtn text="See more jobs" />
        </div>
      </div>

      <div className="my-container py-10">
        <div className="flex items-center">
          <p className="text-lg font-semibold text-[#6B7280] lg:text-2xl">
            Find your way around{" "}
          </p>
          <div>
            <Select
              options={[
                {
                  text: "London",
                  value: "London",
                },
                {
                  text: "Brighton",
                  value: "London",
                },
                {
                  text: "Plymouth",
                  value: "London",
                },
              ]}
              containerClassName="border-none"
              removeBorder
              initialValue="London"
              valueClassName={"font-semibold text-lg lg:text-xl"}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          {Foods.slice(0, 3).map((food, idx) => (
            <FoodCard
              key={idx}
              title={food.title}
              img={food.img}
              location={food.location}
              isMarket={food.isMarket}
              link={food.link}
            />
          ))}
        </div>
        <div className="mb-8 mt-10 flex items-center justify-center">
          <Link href={"/food"}>
            <SeeMoreBtn text="See more places" />
          </Link>
        </div>
      </div>

      <div id={"education"} className="my-container py-10">
        <p className="text-lg font-semibold  lg:text-2xl">Resources</p>

        <div className="mt-5 flex flex-col gap-7 lg:flex-row lg:flex-wrap lg:justify-between">
          {data?.posts?.map((post) => <BlogCard key={post.id} blog={post} />)}
        </div>
      </div>
    </MainLayout>
  );
}

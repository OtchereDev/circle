import React, { useState } from "react";
import MainLayout from "~/layout/MainLayout";
import Select from "~/components/shared/Select";
import FoodCard from "~/components/home/FoodCard";
import { api } from "~/utils/api";

const Food = () => {
  const [location, setLocation] = useState("186338");
  const [page, setPage] = useState(1);

  const resturant = api.restaurant.get.useQuery({ location, page });
  return (
    <MainLayout>
      <div className="my-container py-10 pb-32">
        <div className="flex items-center">
          <p className="text-lg font-semibold text-[#6B7280] lg:text-3xl">
            Find your way around{" "}
          </p>
          <div>
            <Select
              options={[
                {
                  text: "London",
                  value: "186338",
                },
                {
                  text: "Brighton",
                  value: "186273",
                },
                {
                  text: "Plymouth",
                  value: "186258",
                },
              ]}
              containerClassName="border-none"
              removeBorder
              initialValue="186338"
              valueClassName={"font-semibold text-lg lg:text-3xl"}
              onChange={(v) => {
                setLocation(v);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:flex-wrap">
          {(resturant?.data?.restaurants ?? [])?.map((food) => (
            <FoodCard
              key={food.location_id}
              title={food.name}
              img={food.photo}
              location={food.address}
              isMarket={false}
              link={food.web_url}
            />
          ))}
        </div>
        {page != resturant?.data?.totalPage && (
          <button
            onClick={() => {
              if (page < (resturant?.data?.totalPage as number)) {
                setPage((p) => p + 1);
              }
            }}
            className="mx-auto mt-10 block bg-[#d97707] px-4 py-2 text-white"
          >
            {resturant.isFetching ? "Loading..." : "See More"}
          </button>
        )}
      </div>
    </MainLayout>
  );
};

export default Food;

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { client } from "~/utils/db";

interface Food {
  location_id: string;
  name: string;
  latitude: number;
  longitude: number;
  photo: string;
  price: string;
  description: string;
  web_url: string;
  phone: string;
  website: string;
  address: string;
}

const fetchRestuarant = async (location: string, page = 1) => {
  const url = "https://worldwide-restaurants.p.rapidapi.com/search";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "2f01c6f532mshda096b179f5fa42p1e7a4fjsne2ad1fc853a8",
      "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
    },
    body: new URLSearchParams({
      language: "en_US",
      location_id: location,
      currency: "GBP",
      offset: ((page - 1) * 20).toString(),
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const data: any[] = [];
    result.results.data.forEach((res: any) => {
      data.push({
        location_id: res.location_id,
        name: res.name,
        latitude: res.latitude,
        longitude: res.longitude,
        photo: res?.photo?.images?.original?.url,
        price: res.price,
        description: res.description,
        web_url: res.web_url,
        phone: res.phone,
        website: res.website,
        address: res.address,
      });
    });

    const totalPage = Math.floor(
      parseInt(result?.results?.paging?.total_results) /
        parseInt(result?.results?.paging?.results),
    );

    return { data, totalPage };
  } catch (error: any) {
    console.error(error.message);
  }
};

export const restaurantRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        location: z.string(),
        page: z.number().default(1),
      }),
    )
    .query(async ({ input }) => {
      const key = `${input.location}:${input.page}:data`;
      const totalKey = `${input.location}:${input.page}:key`;
      const restaurant = await client.get(key);
      const totalPage = await client.get(totalKey);

      if (restaurant) {
        return {
          restaurants: JSON.parse(restaurant) as Food[],
          totalPage,
        };
      } else {
        try {
          const data = await fetchRestuarant(input.location, input.page);
          await client.set(key, JSON.stringify(data?.data));
          await client.set(totalKey, data?.totalPage as number);

          return {
            restaurants: data?.data as Food[],
            totalPage: data?.totalPage,
          };
        } catch (error) {
          return {
            restaurants: [],
            totalPage: 0,
          };
        }
      }
    }),
});

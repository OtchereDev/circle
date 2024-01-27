import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { blogs } from "./blogs";

export const postRouter = createTRPCRouter({
  getPosts: publicProcedure.query(() => {
    const posts = blogs.map((blog) => ({
      id: blog.id,
      title: blog.blogTitle,
      image: blog.image,
      description: blog.content[0]?.text,
    }));

    return {
      posts,
    };
  }),
  getPost: publicProcedure
    .input(
      z.object({
        postId: z.string().optional(),
      }),
    )
    .query(({ input }) => {
      const post = blogs.find((blog) => blog.id == input.postId);

      return {
        post,
      };
    }),
});

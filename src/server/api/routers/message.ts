import { z } from "zod";
import OpenAI from "openai";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ChatCompletionMessageParam } from "openai/resources";
import { client } from "~/utils/db";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const sender = async (messages: ChatCompletionMessageParam[]) =>
  await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [...messages],
  });

export const messageRouter = createTRPCRouter({
  send: publicProcedure
    .input(
      z.object({
        message: z.array(
          z.object({
            content: z.string(),
            role: z.enum(["user", "assistant", "system"]),
          }),
        ),
        userId: z.string(),
        chatId: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const response = await sender(input.message);
      const messages = [...input.message, response.choices[0]?.message];

      if (input.chatId) {
        await client.set(input.chatId, JSON.stringify(messages));
      } else {
        await client.set(response.id, JSON.stringify(messages));
        await client.rPush(input.userId, response.id);
      }

      return {
        response,
      };
    }),

  get: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const chatIds = await client.lRange(input.userId, 0, -1);
      const chats = await client.mGet(chatIds);
      const chatData = chats.map((chat, idx) => ({
        id: chatIds[idx],
        chat: JSON.parse(chat as string) as unknown as {
          content: string;
          role: string;
        }[],
      }));

      return {
        data: chatData,
      };
    }),
});

import React, { useEffect, useState } from "react";
import { ChatCompletion, ChatCompletionMessageParam } from "openai/resources";
import { api } from "~/utils/api";
import { useUser } from "@auth0/nextjs-auth0/client";

const useChat = () => {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const [chats, setChats] = useState<
    {
      id: string | undefined;
      chat: { content: string; role: string }[];
    }[]
  >([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const sendMessageMutation = api.message.send.useMutation();
  const getMessagesMutation = api.message.get.useMutation();
  const [selectedChatId, setSelectedChatId] = useState("");
  const { user } = useUser();

  const initializeChat = () => {
    const systemMessage: ChatCompletionMessageParam = {
      role: "system",
      content: "You are a UK Lawyer, answer only question related to law",
    };
    const welcomeMessage: ChatCompletionMessageParam = {
      role: "assistant",
      content: `Welcome, ${
        user?.name ?? ""
      } Before we get started, go through this list of countries and type out you’re currently in: \n UK, \n USA, \n Canada, \n South Korea`,
    };
    setMessages([systemMessage, welcomeMessage]);
    setSelectedChatId("");
  };

  useEffect(() => {
    if (!messages?.length) {
      initializeChat();
    }
  }, [messages?.length, setMessages]);

  const addMessage = async (content: string, userId: string) => {
    setIsLoadingAnswer(true);
    try {
      const newMessage: ChatCompletionMessageParam = {
        role: "user",
        content,
      };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      const { response } = await sendMessageMutation.mutateAsync({
        message: newMessages as {
          role: "user" | "assistant" | "system";
          content: string;
        }[],
        userId,
        ...(selectedChatId.length && { chatId: selectedChatId }),
      });
      if (response.choices) {
        const reply = response.choices[0]!.message;
        setMessages([...newMessages, reply]);
      }
    } catch (error) {
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  async function loadMessages() {
    if (user?.email?.length) {
      const data = await getMessagesMutation.mutateAsync({
        userId: user.email,
      });

      setChats(data.data);
    }
  }

  function loadSelectedChat(chatId: string) {
    setSelectedChatId(chatId);
  }

  useEffect(() => {
    if (selectedChatId) {
      const chatmessage = chats.find((chat) => chat.id == selectedChatId);
      if (chatmessage) {
        setMessages(chatmessage.chat as ChatCompletionMessageParam[]);
      }
    }
  }, [selectedChatId]);

  useEffect(() => {
    loadMessages().catch((err: unknown) => {
      console.log(err);
    });
  }, [user]);

  return {
    addMessage,
    isLoadingAnswer,
    messages: messages.filter((message) => message.role != "system"),
    chats,
    loadSelectedChat,
    initializeChat,
  };
};

export default useChat;

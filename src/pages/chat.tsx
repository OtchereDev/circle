import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Toaster, toast } from "sonner";

import useChat from "~/hooks/useChat";

import MainLayout from "~/layout/MainLayout";

import Select from "~/components/shared/Select";
import ChatItem from "~/components/chat/ChatItem";
import { Plus, Recent, SelectArrow, Send } from "~/components/icons";

const Chat = () => {
  const {
    addMessage,
    isLoadingAnswer,
    messages,
    chats,
    loadSelectedChat,
    initializeChat,
  } = useChat();
  const { user } = useUser();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast("Please login or sign up first", { position: "top-right" });
      return;
    } else {
      if (message.length > 0) {
        await addMessage(message, user.email as string);
        setMessage("");
      }
    }
  };

  return (
    <MainLayout removeFooter>
      <Toaster />

      <div className="lg:hidden">
        <div className="my-container bg-[#f9fafb] py-10">
          <div className="flex items-center justify-between">
            <div className=" flex items-center gap-2 border px-4 py-4">
              <Recent />
              <SelectArrow />
            </div>

            <div>
              <Select
                initialValue="docs"
                options={[{ text: "Legal Document Ass..", value: "docs" }]}
              />
            </div>

            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#FEF3C7]">
              <Plus />
            </div>
          </div>

          <div className="my-5 flex h-[400px] flex-col justify-end gap-4 overflow-scroll bg-white px-3 py-4">
            <ChatItem
              isBot
              message="Welcome, Franklina! Before we get started, go through this list of
              countries and type out you’re currently in."
            />

            <ChatItem initials="FA" message="United Kingdom" />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 flex w-full items-center gap-2 bg-[#f9fafb] px-4 py-3">
          <textarea className="w-full resize-none bg-white p-2 outline-none" />
          <Send />
        </div>
      </div>

      <div className="my-container hidden gap-8  py-10 lg:flex lg:h-[90vh]">
        <div className="h-full w-[279px] rounded-2xl bg-[#F9FAFB] px-3 py-7">
          <Select
            initialValue="docs"
            options={[{ text: "Legal Document Assistance", value: "docs" }]}
          />
          <button
            onClick={initializeChat}
            className="mt-4 w-full bg-[#FEF3C7] py-3 text-[#D97706]"
          >
            New conversation
          </button>

          <div className="mt-8 flex flex-col gap-3">
            {chats.map((chat) => (
              <p
                key={chat.id}
                onClick={() => loadSelectedChat(chat.id as string)}
                className=" rounded-md bg-gray-200 px-2 py-3 text-sm font-semibold text-[#374151] hover:cursor-pointer hover:bg-gray-300"
              >
                {chat.chat?.[2]?.content?.slice(0, 30)}
              </p>
            ))}
          </div>
        </div>
        <div className="h-full w-[calc(100%-310px)]  rounded-2xl bg-[#F9FAFB] px-10 py-10">
          <div className="flex h-[90%] min-h-[90%]  overflow-scroll pb-6 ">
            <div className="h-full overflow-scroll ">
              {messages.map((message, idx) => (
                <ChatItem
                  key={idx}
                  isBot={message.role == "assistant"}
                  message={message.content as string}
                  initials="SI"
                />
              ))}
            </div>
          </div>

          <div className="">
            {isLoadingAnswer && (
              <p className="text-sm text-gray-400">
                Please wait whiles I think...
              </p>
            )}
            <form
              id="chat"
              className="flex w-full items-center gap-3 "
              onSubmit={handleSubmit}
            >
              <textarea
                id="prompt-textarea"
                data-id="root"
                rows={1}
                placeholder="Send a message"
                className="gizmo:md:py-3.5 gizmo:placeholder-black/50 gizmo:dark:placeholder-white/50 m-0 w-full resize-none rounded-xl border-0 bg-[#F1F5F9] py-[10px] pl-3 pr-10 outline-none disabled:bg-gray-500 md:py-4 md:pl-4 md:pr-12"
                style={{
                  maxHeight: "200px",
                  height: "56px",
                  overflowY: "hidden",
                }}
                value={message}
                disabled={isLoadingAnswer}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button disabled={isLoadingAnswer}>
                <Send className="cursor-pointer" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;

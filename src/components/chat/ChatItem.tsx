import React from "react";
import Avatar from "./Avatar";
import { BotMessage } from "../icons";

interface IChatItem {
  initials?: string;
  message: string;
  isBot?: boolean;
}

const ChatItem: React.FC<IChatItem> = ({ isBot, message, initials }) => {
  return (
    <div className="mt-4 flex gap-2 lg:rounded-md lg:bg-white lg:p-4">
      <div className="w-[25px] ">
        {!isBot ? <Avatar initials={initials!} /> : <BotMessage />}
      </div>
      <p className="text-sm lg:text-base">{message}</p>
    </div>
  );
};

export default ChatItem;

import { createContext } from "react";

const UserInfoContext = createContext();
const MessageList = createContext([
  {
    text: "Hi，我是ChatGpt，一个聊天机器人。我可以为您提供有关世界各地的信息，帮助您更好地了解这个世界。",
    type: "receive",
  },
]);

export { UserInfoContext, MessageList };

import React, { useContext, useState } from "react";
import styles from "./index.scss";
import ChatInput from "components/ChatInput";
import ChatContent from "components/ChatContent";
import { UserInfoContext } from "src/store/context";

const Chat = () => {
  const userInfo = useContext(UserInfoContext);

  const [messageList, setMessageList] = useState([
    {
      text: "Hi，我是ChatGpt，一个聊天机器人。我可以为您提供有关世界各地的信息，帮助您更好地了解这个世界。",
      type: "receive",
    },
  ]);
  const handleAdd = (msg) =>
    setMessageList((list) => {
      list.push(msg);
      return [...list];
    });

  return (
    <div className={styles.chat}>
      <div className={styles.header}>Echat</div>
      <ChatContent messageList={messageList} />
      <ChatInput onAddMessage={handleAdd} />
    </div>
  );
};

export default Chat;

import React, { useContext, useState } from "react";
import styles from "./index.scss";
import ChatInput from "components/ChatInput";
import ChatContent from "components/ChatContent";
import { UserInfoContext } from "src/store/context";

const Chat = () => {
  const userInfo = useContext(UserInfoContext);

  const [messageList, setMessageList] = useState([
    {
      text: `Hi，欢迎使用Echat，下方是您的设备id`,
      type: "receive",
    }, {
      text: `${userInfo.visitorId}`,
      type: "receive",
    },
  ]);
  const handleAdd = (msg) => {
    setMessageList(list => {
      list.push(msg);
      return [...list];
    });
  }

  return (
    <div className={styles.chat}>
      <div className={styles.header}>Echat</div>
      <ChatContent messageList={messageList} />
      <ChatInput onAddMessage={msg => handleAdd(msg)} />
    </div>
  );
};

export default Chat;

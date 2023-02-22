import React, { useContext, useState, useRef, useEffect } from "react";
import styles from "./index.scss";
import ChatInput from "components/ChatInput";
import ChatContent from "components/ChatContent";
import { UserInfoContext } from "src/store/context";
import useListenElementResize from "src/hooks/useListenElementResize";
import Header from "src/components/Header";

const Chat = ({ onHeightChange }) => {
  const userInfo = useContext(UserInfoContext);
  const contentRef = useRef(null);
  const { _, height } = useListenElementResize(contentRef);
  useEffect(() => {
    onHeightChange(height);
  }, [height]);

  const [messageList, setMessageList] = useState([
    {
      text: `Hi，欢迎使用Echat，下方是您的设备id`,
      type: "receive",
    },
    {
      text: `${userInfo.visitorId}`,
      type: "receive",
    },
  ]);
  const handleAdd = (msg) => {
    setMessageList((list) => {
      list.push(msg);
      return [...list];
    });
  };

  return (
    <div className={styles.chat} ref={contentRef}>
      <Header />
      <div className={styles["header-blank"]}></div>
      <ChatContent messageList={messageList} />
      <div className={styles["bottom-blank"]}></div>
      <ChatInput onAddMessage={(msg) => handleAdd(msg)} />
    </div>
  );
};

export default Chat;

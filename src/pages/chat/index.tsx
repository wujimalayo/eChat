import { useContext, useState, useRef, useEffect } from "react";
import styles from "./index.scss";
import ChatInput from "components/ChatInput";
import ChatContent from "components/ChatContent";
import { Context } from "src/store/context";
import useListenElementResize from "src/hooks/useListenElementResize";
import Header from "src/components/Header";
import { Message } from "src/interfaces/default";

const Chat = ({ onHeightChange = (height: number) => {} }) => {
  const userInfo = useContext(Context);
  const contentRef = useRef(null);
  const { height } = useListenElementResize(contentRef);
  useEffect(() => {
    onHeightChange(height);
  }, [height]);

  const [messageList, setMessageList] = useState<Message[]>([
    {
      text: `Hi，欢迎使用Echat，下方是您的设备id`,
      type: "receive",
    },
    {
      text: `${userInfo.visitorId}`,
      type: "receive",
    },
  ]);
  const handleAdd = (msg: Message) => {
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
      <ChatInput onAddMessage={(msg: Message) => handleAdd(msg)} />
    </div>
  );
};

export default Chat;

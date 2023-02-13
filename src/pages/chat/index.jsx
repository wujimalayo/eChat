import React, { useContext } from "react";
import styles from "./index.scss";
import ChatInput from "components/ChatInput";
import ChatContent from "components/ChatContent";
import { UserInfoContext } from "src/store/context";

const Chat = () => {
  const userInfo = useContext(UserInfoContext);
  return (
    <div className={styles.chat}>
      <div className={styles.header}>Echat</div>
      <ChatContent />
      <ChatInput />
    </div>
  );
};

export default Chat;

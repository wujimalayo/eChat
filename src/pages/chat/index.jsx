import React from "react";
import styles from "./index.scss";
import ChatInput from "components/ChatInput";

const Chat = () => {
  return (
    <div className={styles.chat}>
      <div className={styles.header}>header</div>
      <div className={styles.content}>content</div>
      <ChatInput />
    </div>
  );
};

export default Chat;

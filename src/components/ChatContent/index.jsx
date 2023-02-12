import React from "react";
import styles from "./index.scss";
import Message from "./Message";
import { messageList } from "src/assets/assetsCommonExports";

const ChatContent = () => {
  return (
    <div className={styles.content}>
      <div className={styles["msg-list"]}>
        {messageList.map((msg, i) => (
          <Message key={i} {...msg} />
        ))}
      </div>
    </div>
  );
};

export default ChatContent;

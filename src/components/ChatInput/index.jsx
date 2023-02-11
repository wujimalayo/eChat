import React from "react";
import { Input } from "rsuite";
import styles from "./index.scss";

const ChatInput = () => {
  return (
    <div className={styles["input-wrapper"]}>
      <Input />
    </div>
  );
};

export default ChatInput;

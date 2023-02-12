import React, { useState } from "react";
import styles from "./index.scss";
import { send_message, loading_icon } from "src/assets/assetsCommonExports";
import classNames from "classnames";

const ChatInput = () => {
  const [loading, setLoading] = useState(false);
  const [press, setPress] = useState(false);
  return (
    <div className={styles["input-wrapper"]}>
      {/* <Input
        as="textarea"
        style={{ overflowY: rows < 8 ? "hidden" : "auto" }}
        rows={rows}
        onScroll={() => {
          rows < 8 && setRows((n) => n + 0.5);
        }}
      /> */}
      <div
        className={styles.textarea}
        suppressContentEditableWarning
        contentEditable={true}
      >
        <br />
      </div>

      <div
        onClick={() => setLoading((state) => !state)}
      >
        {loading ? (
          <img
            className={classNames(styles.send, styles["animation-spin"])}
            src={loading_icon}
          />
        ) : (
          <img className={styles.send} src={send_message} />
        )}
      </div>
    </div>
  );
};

export default ChatInput;

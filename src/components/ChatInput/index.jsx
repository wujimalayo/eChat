import React, { useState, useContext } from "react";
import styles from "./index.scss";
import { send_message, loading_icon } from "src/assets/assetsCommonExports";
import classNames from "classnames";
import { sendnRecieve } from "src/service/api";
import { UserInfoContext } from "src/store/context";

const ChatInput = () => {
  const userInfo = useContext(UserInfoContext);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSend = async () => {
    if (!inputValue.trim().length) return;
    setLoading(true);
    sendnRecieve({
      device_id: userInfo.visitorId,
      user_chat: inputValue,
    }).then((res) => {
      console.log(res);
      setLoading(false);
    });
  };

  return (
    <div className={styles["input-wrapper"]}>
      <div
        className={styles.textarea}
        suppressContentEditableWarning
        contentEditable={true}
        onInput={(e) => setInputValue(e.target.innerHTML)}
      >
        <br />
      </div>

      {loading ? (
        <img
          className={classNames(styles.send, styles["animation-spin"])}
          src={loading_icon}
        />
      ) : (
        <img className={styles.send} src={send_message} onClick={handleSend} />
      )}
    </div>
  );
};

export default ChatInput;

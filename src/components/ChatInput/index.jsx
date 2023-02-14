import React, { useState, useContext, useRef } from "react";
import styles from "./index.scss";
import { send_message, loading_icon } from "src/assets/assetsCommonExports";
import classNames from "classnames";
import { sendnRecieve } from "src/service/api";
// import { UserInfoContext } from "src/store/context";

const ChatInput = ({ onAddMessage }) => {
  // const userInfo = useContext(UserInfoContext);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    if (!text.trim().length) return;
    setLoading(true);
    onAddMessage({
      text: text,
      type: "send",
    });
    const formData = new FormData();
    formData.append("device_id", "123456");
    formData.append("user_chat", text);
    sendnRecieve(formData)
      .then((res) => {
        onAddMessage({
          text: res.ChatGpt,
          type: "receive",
        });
        setLoading(false);
        inputRef.current;
      })
      .catch(() => setLoading(false));
  };

  const inputRef = useRef();

  const handleInputContent = () => {
    const text = getText(inputRef.current);
    handleSend(text);
  };

  const getText = (ele) => {
    let res = "";
    Array.from(ele.childNodes).forEach((child) => {
      if (child.nodeName === "#text") {
        res += child.nodeValue;
      }
      if (child.hasChildNodes()) {
        res += getText(child);
      }
    });
    return res;
  };

  return (
    <div className={styles["input-wrapper"]}>
      <div
        ref={inputRef}
        className={styles.textarea}
        suppressContentEditableWarning
        contentEditable={true}
      >
        <br />
      </div>

      {loading ? (
        <img
          className={classNames(styles.send, styles["animation-spin"])}
          src={loading_icon}
        />
      ) : (
        <img
          className={styles.send}
          src={send_message}
          onClick={handleInputContent}
        />
      )}
    </div>
  );
};

export default ChatInput;

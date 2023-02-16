import React, { useState, useContext, useRef, useEffect } from "react";
import styles from "./index.scss";
import { send_message, loading_icon } from "src/assets/assetsCommonExports";
import classNames from "classnames";
import { sendnRecieve } from "src/service/api";
import { UserInfoContext } from "src/store/context";

const ChatInput = ({ onAddMessage }) => {
  const userInfo = useContext(UserInfoContext);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const loadingRef = useRef(null)

  useEffect(() => {
    if (loadingRef.current) {
      loadingRef.current.style.animation =
        `animation: spin 1s infinite linear,${loading ? 'show' : 'hidden'} 1s linear forwards`
    }
  }, [loading])

  const handleSend = async (text) => {
    if (!text.trim().length) return;
    setLoading(true);
    onAddMessage({
      text: text,
      type: "send",
    });
    inputRef.current.innerHTML = ''
    const formData = new FormData();
    formData.append("device_id", userInfo.visitorId);
    formData.append("user_chat", text);
    sendnRecieve(formData)
      .then(({ ChatGpt, msg, code }) => {
        onAddMessage({
          text: ChatGpt || msg,
          type: "receive",
          code: code
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleInputContent = () => {
    if (!loading) {
      const text = getText(inputRef.current);
      handleSend(text);
    }
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
      <img
        className={
          classNames(
            styles.send,
            styles[loading ? "animation-spin-show" : "animation-spin"]
          )}
        src={loading_icon}
      />
      <img
        className={
          classNames(
            styles.send,
            styles[loading ? "hidden" : "show"]
          )
        }
        src={send_message}
        onClick={handleInputContent}
      />
    </div>
  );
};

export default ChatInput;

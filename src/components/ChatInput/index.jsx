import React, { useState, useContext, useRef, useEffect } from "react";
import styles from "./index.scss";
import { send_message, loading_icon } from "src/assets/assetsCommonExports";
import classNames from "classnames";
import { sendnRecieve } from "src/service/api";
import { UserInfoContext } from "src/store/context";

const ChatInput = ({ onAddMessage }) => {
  const userInfo = useContext(UserInfoContext);
  const [loading, setLoading] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const inputRef = useRef(null);
  const loadingRef = useRef(null);

  useEffect(() => {
    if (loadingRef.current) {
      loadingRef.current.style.animation = `animation: spin 1s infinite linear,${
        loading ? "show" : "hidden"
      } 1s linear forwards`;
    }
  }, [loading]);

  const handleSend = async (text) => {
    if (!text.trim().length) return;
    setLoading(true);
    onAddMessage({
      text: text,
      type: "send",
    });
    inputRef.current.innerHTML = "";
    sendnRecieve({
      device_id: userInfo.visitorId,
      user_chat: text,
    })
      .then(({ ChatGpt, msg, code, chat_num }) => {
        onAddMessage({
          text: ChatGpt || msg,
          type: "receive",
          code: code,
        });
        userInfo.updateUserInfo({
          chatNum: chat_num,
        });
        setLoading(false);
      })
      .catch(() => {
        onAddMessage({
          text: "网络好像出错了，请检查本地网络质量后重新编辑发送或联系开发人员",
          type: "receive",
          code: 1,
        });
        setLoading(false);
      });
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

  const handleInput = () => {
    const length = getText(inputRef.current).length;
    if (length > 0) {
      setShowPlaceholder(false);
    } else {
      setShowPlaceholder(true);
    }
  };

  return (
    <div className={styles["input-wrapper"]}>
      {showPlaceholder && (
        <div className={styles["show-placeholder"]}>
          在这里输入你想查询的内容噢~
        </div>
      )}

      <div
        ref={inputRef}
        className={classNames(styles.textarea)}
        suppressContentEditableWarning
        contentEditable={true}
        onInput={() => handleInput()}
      >
        <br />
      </div>
      <img
        className={classNames(
          styles.send,
          styles[loading ? "animation-spin-show" : "animation-spin"]
        )}
        src={loading_icon}
      />
      <img
        className={classNames(styles.send, styles[loading ? "hidden" : "show"])}
        src={send_message}
        onClick={handleInputContent}
      />
    </div>
  );
};

export default ChatInput;

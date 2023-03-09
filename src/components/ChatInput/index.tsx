import React, { useState, useContext, useRef, useEffect } from "react";
import styles from "./index.scss";
import { send_message, loading_icon } from "src/assets/assetsCommonExports";
import classNames from "classnames";
import { sendnRecieve } from "src/service/api";
import { Context } from "src/store/context";
import PopupMessage from "../PopupMessage";
import { Message } from "src/interfaces/default";
// import VConsole from "vconsole";

interface Props {
  onAddMessage: (msg: Message) => void;
}

const ChatInput = ({ onAddMessage }: Props) => {
  const userInfo = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const inputRef = useRef<HTMLDivElement>(null);
  // const vConsole = new VConsole({ theme: "dark" });

  useEffect(() => {
    addEventListener("keydown", handleKeyUpListen);

    return () => {
      removeEventListener("keydown", handleKeyUpListen);
      // vConsole.destroy();
    };
  }, []);

  const handleKeyUpListen = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleInputContent();
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim().length) return;
    setLoading(true);
    onAddMessage({
      text: text,
      type: "send",
    });
    inputRef.current && (inputRef.current.innerHTML = "");
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
        if (msg && msg.includes("token认证失败")) {
          userInfo.setOptionsVisible(true);
        }
      })
      .catch((err) => {
        PopupMessage.error(err);
        onAddMessage({
          text: "网络好像出错了，请稍后重新编辑发送或联系开发人员",
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

  const getText = (ele: HTMLDivElement | null) => {
    let res = "";
    if (ele) {
      Array.from(ele.childNodes as NodeListOf<HTMLDivElement>).forEach(
        (child) => {
          if (child.nodeName === "#text") {
            res += child.nodeValue;
          }
          if (child.hasChildNodes()) {
            res += getText(child);
          }
        }
      );
    }

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

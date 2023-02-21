import React, { useEffect, useMemo } from "react";
import styles from "./index.scss";
import {
  boot_avatar,
  question_mark,
  copy,
} from "src/assets/assetsCommonExports";
import classNames from "classnames";
import Clipboard from "clipboard";
import PopupMessage from "../PopupMessage";

const Message = ({
  text: _text, // 消息文本
  type, // "receive"接收的消息，"send"发出的消息
  code = 0, // 状态码: 0 有效 1 错误
  index,
}) => {
  const text = useMemo(() => {
    return _text ? (
      _text
    ) : (
      <div className={styles["unknown-message"]}>未知消息内容</div>
    );
  }, [_text]);

  useEffect(() => {
    const btnCopy = new Clipboard(`.copy-btn-${index}`);
    btnCopy.on("success", function (e) {
      showCopyRes(true);
      e.clearSelection();
    });

    btnCopy.on("error", function (e) {
      showCopyRes(false);
    });
  }, []);

  const showCopyRes = (isSuccess) => {
    isSuccess
      ? PopupMessage.success("复制成功")
      : PopupMessage.warning("复制失败，请长按屏幕手动复制");
  };

  const isSend = useMemo(() => type === "send", [type]);

  return (
    <div
      className={
        isSend
          ? styles.message
          : classNames(styles.message, styles["recieve-message"])
      }
      style={{
        color: code === 1 ? "#f44336" : "#343541",
      }}
    >
      <div className={styles.avatar}>
        {isSend ? <img src={question_mark} /> : <img src={boot_avatar} />}
      </div>
      {text}
      {!isSend && (
        <div
          className={classNames(styles.copy, `copy-btn-${index}`)}
          title="复制答案"
          data-clipboard-text={text}
        >
          <img src={copy} />
        </div>
      )}
    </div>
  );
};

export default Message;

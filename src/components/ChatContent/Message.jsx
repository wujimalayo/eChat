import React, { useMemo, useState } from "react";
import styles from "./index.scss";
import {
  boot_avatar,
  question_mark,
  copy,
} from "src/assets/assetsCommonExports";
import classNames from "classnames";
import { useToaster, Message as Msg } from "rsuite";

const Message = ({
  text: _text, // 消息文本
  type, // "receive"接收的消息，"send"发出的消息
  time = null, // 消息时间
}) => {
  const toaster = useToaster();
  const text = useMemo(() => {
    return _text ? (
      _text
    ) : (
      <div className={styles["unknown-message"]}>未知消息内容</div>
    );
  }, [_text]);

  const message = (text) => (
    <Msg showIcon type="info">
      {text}
    </Msg>
  );

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(text);
      toaster.push(message('复制成功'), { placement: 'topCenter' })
    } catch (err) {
      toaster.push(message('复制失败，请长按屏幕手动复制')
        , { placement: 'topCenter' })
    }
  }

  const isSend = useMemo(() => type === "send", [type]);

  return (
    <div
      className={
        isSend
          ? styles.message
          : classNames(styles.message, styles["send-message"])
      }
    >
      <div className={styles.avatar}>
        {isSend ? <img src={question_mark} /> : <img src={boot_avatar} />}
      </div>
      {text}
      {!isSend && (
        <div className={styles.copy} title="复制答案" onClick={handleCopy}>
          <img src={copy} />
        </div>
      )}
    </div>
  );
};

export default Message;

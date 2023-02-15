import { useRef, useEffect } from 'react'
import styles from "./index.scss";
import Message from "./Message";
import useListenElementResize from "src/hooks/useListenElementResize";

const ChatContent = ({ messageList }) => {
  const listRef = useRef(null)
  const contentRef = useRef(null)
  const { _, height } = useListenElementResize(listRef)

  useEffect(() => {
    contentRef.current && contentRef.current.scrollTo({
      top: height,
      behavior: "smooth"
    });
  }, [height])

  return (
    <div id="content" ref={contentRef} className={styles.content}>
      <div ref={listRef} className={styles["msg-list"]}>
        {messageList.map((msg, i) => (
          <Message key={i} {...msg} />
        ))}
      </div>
    </div>
  );
};

export default ChatContent;

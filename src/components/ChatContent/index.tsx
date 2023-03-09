import { useRef, useEffect } from "react";
import styles from "./index.scss";
import Message from "./Message";
import useListenElementResize from "src/hooks/useListenElementResize";
import { Message as Msg } from "src/interfaces/default";

interface Props {
  messageList: Msg[];
}

const ChatContent = ({ messageList }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { height } = useListenElementResize(listRef);
  useEffect(() => {
    contentRef.current &&
      contentRef.current.scrollTo({
        top: height,
        behavior: "smooth",
      });
  }, [height]);

  return (
    <div id="content" ref={contentRef} className={styles.content}>
      <div ref={listRef} className={styles["msg-list"]}>
        {messageList.map((msg, i) => (
          <Message key={i} index={i} {...msg} />
        ))}
      </div>
    </div>
  );
};

export default ChatContent;

import styles from "./index.scss";
import Message from "./Message";

const ChatContent = ({ messageList }) => {
  return (
    <div className={styles.content}>
      <div className={styles["msg-list"]}>
        {messageList.map((msg, i) => (
          <Message key={i} {...msg} />
        ))}
      </div>
    </div>
  );
};

export default ChatContent;

import { useImperativeHandle, forwardRef, createRef } from "react";
import { useToaster, Message } from "rsuite";
import ReactDOM from "react-dom/client";
import "./index.scss";

const PopupMessage = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    success: (text) => showToaster("success", text),
    warning: (text) => showToaster("warning", text),
    error: (text) => showToaster("error", text),
  }));

  const toaster = useToaster();

  const message = (type = "success", text) => (
    <Message showIcon type={type}>
      {text}
    </Message>
  );

  const showToaster = (type, text) => {
    toaster.push(message(type, text), {
      placement: "topCenter",
    });
  };

  return;
});

// 创建容器
const el = document.createElement("div");
document.body.append(el);

const root = ReactDOM.createRoot(el);
const msgRef = createRef();

root.render(<PopupMessage ref={msgRef} />);

export default {
  success: (text) => msgRef.current.success(text),
  warning: (text) => msgRef.current.warning(text),
  error: (text) => msgRef.current.error(text),
};

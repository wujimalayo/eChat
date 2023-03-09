import { useImperativeHandle, forwardRef, createRef } from "react";
import { useToaster, Message } from "rsuite";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { TypeAttributes } from "rsuite/esm/@types/common";

const PopupMessage = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    success: (text: string) => showToaster("success", text),
    warning: (text: string) => showToaster("warning", text),
    error: (text: string) => showToaster("error", text),
  }));

  const toaster = useToaster();

  const message = (
    type: TypeAttributes.Status | undefined = "success",
    text: string
  ) => (
    <Message showIcon type={type}>
      {text}
    </Message>
  );

  const showToaster = (
    type: TypeAttributes.Status | undefined,
    text: string
  ) => {
    toaster.push(message(type, text), {
      placement: "topCenter",
    });
  };

  return <div />;
});

// 创建容器
const el = document.createElement("div");
document.body.append(el);

const root = ReactDOM.createRoot(el);
const msgRef = createRef<any>();

root.render(<PopupMessage ref={msgRef} />);

export default {
  success: (text: string) => msgRef.current.success(text),
  warning: (text: string) => msgRef.current.warning(text),
  error: (text: string) => msgRef.current.error(text),
};

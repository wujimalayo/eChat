import "./App.css";
import "rsuite/dist/rsuite.min.css";
import { useEffect, useState, useRef } from "react";
import Chat from "pages/chat";
import AppLoading from "components/AppLoading";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import { Context } from "src/store/context";
import { UserInfo, UserInfoSetter } from "./interfaces/default";

function App() {
  const { error, data } = useVisitorData();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    phone: "",
    inviteCode: "",
    visitorId: "",
    chatNum: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string>("");
  // 全局控制options是否弹出
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
  const appRef = useRef<HTMLInputElement>(null);

  const resize = () => {
    if (appRef.current) {
      appRef.current.style.height = `${window.innerHeight}px`;
    }
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    // 返回visitorData时结束加载
    if (data) {
      setLoading(false);
      handleUpdateUserInfo({ visitorId: data.visitorId });
    }
    if (error) {
      setErrorText("Echat load failed, please try later.");
    }
  }, [data, error]);

  const handleUpdateUserInfo = (info: UserInfoSetter) => {
    setUserInfo((usr) => ({
      ...usr,
      ...info,
    }));
  };

  const handleHeightChange = (height: number) => {
    appRef.current &&
      appRef.current.scrollTo({
        top: height,
        behavior: "smooth",
      });
  };

  if (loading) {
    return <AppLoading errorMsg={errorText} />;
  }

  return (
    <Context.Provider
      value={{
        ...userInfo,
        updateUserInfo: handleUpdateUserInfo,
        optionsVisible,
        setOptionsVisible,
      }}
    >
      <div ref={appRef} className="App">
        <Chat onHeightChange={handleHeightChange} />
      </div>
    </Context.Provider>
  );
}

export default App;

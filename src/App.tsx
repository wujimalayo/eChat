import "./App.css";
import "rsuite/dist/rsuite.min.css";
import { useEffect, useState, useRef } from "react";
import Chat from "pages/chat";
import AppLoading from "components/AppLoading";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import { UserInfoContext } from "src/store/context";

function App() {
  const { error, data } = useVisitorData();

  const [userInfo, setUserInfo] = useState({
    phone: "",
    inviteCode: "",
    visitorId: "",
    chatNum: 0,
  });

  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");
  // 全局控制options是否弹出
  const [optionsVisible, setOptionsVisible] = useState(false);
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

  const handleUpdateUserInfo = (info: {
    visitorId: string;
    phone?: string;
    inviteCode?: string;
    chatNum?: number;
  }) => {
    setUserInfo((o) => ({
      ...o,
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
    <UserInfoContext.Provider
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
    </UserInfoContext.Provider>
  );
}

export default App;
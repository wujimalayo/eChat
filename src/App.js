import "./App.css";
import "rsuite/dist/rsuite.min.css";
import React, { useEffect, useState } from "react";
import Chat from "pages/chat";
import AppLoading from "components/AppLoading";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import { UserInfoContext } from "src/store/context";

function App() {
  const { error, data } = useVisitorData();
  const [visitorId, setVisitorId] = useState(undefined);
  // const [phone, setPhone] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    // 返回visitorData时结束加载
    if (data) {
      setLoading(false);
      setVisitorId(data.visitorId);
    }
  }, [data]);

  useEffect(() => {
    // 返回visitorData时结束加载
    if (error) {
      setErrorText("EChat load failed, please try later.");
    }
  }, [error]);
  if (loading) {
    return <AppLoading errorMsg={errorText} />;
  }

  return (
    <UserInfoContext.Provider
      value={{
        phone: undefined,
        visitorId,
      }}
    >
      <div className="App">
        <Chat />
      </div>
    </UserInfoContext.Provider>
  );
}

export default App;

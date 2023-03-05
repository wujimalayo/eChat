import { createContext } from "react";
import { GlobalContext, UserInfoSetter } from "src/interfaces/default";

const Context = createContext<GlobalContext>({
  visitorId: "",
  phone: "",
  inviteCode: "",
  chatNum: 0,
  optionsVisible: false,
  setOptionsVisible: function (state: boolean): void {
    throw new Error("Function 'setOptionsVisible' is not implemented.");
  },
  updateUserInfo: function (usr: UserInfoSetter): void {
    throw new Error("Function 'updateUserInfo' is not implemented.");
  },
});

export { Context };

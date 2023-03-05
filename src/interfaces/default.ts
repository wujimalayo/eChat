interface UserInfo {
  visitorId: string;
  phone: string;
  inviteCode: string;
  chatNum: number;
}

// 赋值松散类型
interface UserInfoSetter {
  visitorId?: string;
  phone?: string;
  inviteCode?: string;
  chatNum?: number;
}

interface GlobalContext extends UserInfo {
  optionsVisible: boolean;
  setOptionsVisible: (state: boolean) => void;
  updateUserInfo: (usr: UserInfoSetter) => void;
}

interface Message {
  text: string;
  type: "receive" | "send";
}

export { UserInfo, GlobalContext, UserInfoSetter, Message };

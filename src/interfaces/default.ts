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
  text: string; // 消息文本
  type: "receive" | "send"; // 消息类型
  code?: 0 | 1; // 状态码: 0 有效 1 错误
}

export { UserInfo, GlobalContext, UserInfoSetter, Message };

import { request } from "src/utils/request";

// 发送问题，返回回答
export const sendnRecieve = (params) => {
  return request("http://150.109.70.53/e/chat", params);
};

// 给手机号发送验证码
export const sendCode = (params) => {
  return request("http://150.109.70.53/e/sendmsg", params);
};

// 通过手机号和验证码登录
export const login = (params) => {
  return request("http://150.109.70.53/e/login", params);
};

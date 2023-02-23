import { request } from "src/utils/request";

//  查询用户信息
export const getUserInfo = () => {
  return request("/e/getUser");
};

// 刷新token
export const refreshToken = () => {
  return request("/e/refresh");
};

// 发送问题，返回回答
export const sendnRecieve = (params) => {
  return request("/e/chat", params);
};

// 给手机号发送验证码
export const sendCode = (params) => {
  return request("/e/sendmsg", params);
};

// 通过手机号和验证码登录
export const login = (params) => {
  return request("/e/login", params);
};

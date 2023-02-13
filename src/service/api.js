import { request } from "src/utils/request";

export const sendnRecieve = (params) => {
  return request("http://150.109.70.53/e/chat", params);
};

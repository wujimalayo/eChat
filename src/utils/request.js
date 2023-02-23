import { TOKEN_KEY } from "src/assets/constant";

export function request(url = "", params = {}) {
  const formData = new FormData();
  const ip = "http://150.109.70.53";
  const ipName = "http://www.zxyykx.cn";
  for (const key in params) {
    formData.append(key, params[key]);
  }

  const headers = {},
    token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    headers.Authorization = token;
  }

  return fetch(ipName + url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers,
    body: formData, // body data type must match "Content-Type" header
  }).then((res) => res.json()); // parses JSON response into native JavaScript objects
}

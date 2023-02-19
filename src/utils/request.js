export function request(url = "", params = {}) {
  const formData = new FormData();
  for (const key in params) {
    formData.append(key, params[key]);
  }

  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // headers: {
      // "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      // "Content-Type": "multipart/form-data"
    // },
    body: formData, // body data type must match "Content-Type" header
  }).then((res) => res.json()); // parses JSON response into native JavaScript objects
}

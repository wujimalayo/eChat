export function request(url = "", params = {}) {
  console.log(params);
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(params), // body data type must match "Content-Type" header
  }).then((res) => res.json()); // parses JSON response into native JavaScript objects
}

type Method = "GET" | "POST" | "PATCH" | "DELETE";


const request = async function (method: Method, endpoint: string, data?: any) {

  const opts: any = { method, headers: {}, credentials: "include" };

  if (data) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(data);
  };

  return fetch(endpoint, opts);
};

export const get = function (endpoint: string) {
  return request("GET", endpoint);
};

export const del = function (endpoint: string) {
  return request("DELETE", endpoint);
};

export const post = function (endpoint: string, data: any) {
  return request("POST", endpoint, data);
};

export const patch = function (endpoint: string, data: any) {
  return request("PATCH", endpoint, data);
};

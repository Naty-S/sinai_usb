type Method = "GET" | "POST" | "PATCH" | "DELETE";


const request = async function (method: Method, endpoint: string, data?: any) {

  const opts: any = { method, credentials: "same-origin" };

  if (data) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(data);
  };

  return fetch(endpoint, opts);
};

export const CAS_BASE_URL = "https://secure.dst.usb.ve";
export const CAS_LOGIN_URL = "https://secure.dst.usb.ve/login";
export const CAS_VALIDATE_URL = "/proxyValidate";

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

import axios from "axios";

const api = axios.create({
  baseURL: "https://backapp-1abe2a68e118.herokuapp.com",
  headers: {
    accept: "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    console.log("request start", config);
    return config;
  },
  function (error) {
    console.log("request error", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    console.log("get response", response);
    return response;
  },
  function (error) {
    console.log("response error", error);
    return Promise.reject(error);
  }
);

export default api;

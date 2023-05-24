import axios from "axios";
import Vue from "vue";

// let baseURL = "http://localhost:4000";
let baseURL = "http://8.130.18.26:4000";
axios.defaults.baseURL = baseURL;
axios.interceptors.request.use((config) => {
  const url = config.url;
  if (url.indexOf("?") >= 0) {
    config.url =
      url + `&timestamp=${Date.now()}&cookie=${localStorage.getItem("cookie")}`;
  } else {
    config.url =
      url + `?timestamp=${Date.now()}&cookie=${localStorage.getItem("cookie")}`;
  }

  //   console.log(config.url);
  return config;
});
Vue.prototype.$http = axios;

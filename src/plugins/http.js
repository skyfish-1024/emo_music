import axios from "axios";
import Vue from "vue";

let baseURL = "http://localhost:4000";
// let baseURL = "http://8.130.18.26:4000";
axios.defaults.baseURL = baseURL;
// axios.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${window.localStorage.getItem(
//     "token"
//   )}`;
//   return config;
// });
Vue.prototype.$http = axios;

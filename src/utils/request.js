// import axios from "axios";

// import store from '@/store'
import { getBaseURL } from "@/utils/util";

let baseURL = process.env.BASE_URL ? process.env.BASE_URL : getBaseURL();
let baseENV = process.env.BASE_ENV;
baseURL += baseENV;

// console.log("baseURL", baseURL);
// console.log("baseENV", baseENV);

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  baseURL: baseURL, // api 的 base_url
  // withCredentials: true, // 跨域请求时发送 cookies
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
    //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    //   config.headers['X-Token'] = getToken()
    // }
    return config;
  },
  error => {
    // Do something with request error
    // console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get information such as headers or status
   * Please return  response => response
   */
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 XMLHttpRequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    return response;
  },
  err => {
    // console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })

    if (err && err.response) {
      var responseMessage = err.response.data.message;
      switch (err.response.status) {
        case 400:
          err.response.message = responseMessage || "请求错误";
          Message({
            message: "请求错误",
            type: "warning"
          });
          break;

        case 401:
          err.response.message = responseMessage || "未授权，请登录";
          Message({
            message: "未授权，请登录",
            type: "warning"
          });
          break;

        case 403:
          err.response.message = responseMessage || "拒绝访问";
          Message({
            message: "拒绝访问",
            type: "warning"
          });
          break;

        case 404:
          err.response.message =
            responseMessage || `请求地址出错: ${err.response.config.url}`;
          Message({
            message: "请求地址出错: ${err.response.config.url}",
            type: "warning"
          });
          break;

        case 405:
          err.response.message = responseMessage || "拒绝访问";
          Message({
            message: "拒绝访问",
            type: "warning"
          });
          break;

        case 408:
          err.response.message = responseMessage || "请求超时";
          Message({
            message: "请求超时",
            type: "warning"
          });
          break;

        case 500:
          err.response.message = responseMessage || "服务器内部错误";

          if (
            err.response.data["exception"] ===
            "io.jsonwebtoken.ExpiredJwtException"
          ) {
            var msg = "Token过期 超时,请重新登陆";
            if (confirm(msg) === true) {
              router.push("/login");
              location.reload();
            } else {
            }
          } else {
          }
          break;

        case 501:
          err.response.message = responseMessage || "服务未实现";
          Message({
            message: "服务未实现",
            type: "warning"
          });
          break;

        case 502:
          err.response.message = responseMessage || "网络错误";
          Message({
            message: "网络错误",
            type: "warning"
          });
          break;

        case 503:
          err.response.message = responseMessage || "服务不可用";
          Message({
            message: "服务不可用",
            type: "warning"
          });
          break;

        case 504:
          err.response.message = responseMessage || "网络超时";
          Message({
            message: "网络超时",
            type: "warning"
          });
          break;

        case 505:
          err.response.message = responseMessage || "HTTP版本不受支持";
          Message({
            message: "HTTP版本不受支持",
            type: "warning"
          });
          break;

        default:
          err.response.message = responseMessage;
      }
    }
    return Promise.reject(err);
  }
);

export default service;

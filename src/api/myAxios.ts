import axios, { AxiosInstance } from "axios";

const isDev = process.env.NODE_ENV === 'development';

const Axios : AxiosInstance = axios.create({
    baseURL: isDev ? 'http://localhost:8080/api': 'www.huangzhitao.asia',
    timeout: 10000,//超时时间 10s
    
});
Axios.defaults.withCredentials = true;  //携带请求凭证

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // console.log("我要开始发请求咯",config)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    // console.log("我接收到啦",response.data)
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // if (response?.data?.code === 40100){
    //     const redirectUrl = window.location.href
    //     window.location.href = `/my/login?redirect=${redirectUrl}`
    // }
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default Axios;

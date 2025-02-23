import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建 axios 实例
console.log(import.meta.env);

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 比如添加 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    console.error(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    const res = response.data;

    if (res.code !== 0) {
      // 这里可以根据实际情况进行处理，比如显示错误信息
      console.error('Error:', res.message);
      ElMessage.error(res.error || 'Error');
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res.data;
    }
  },
  error => {
    // 对响应错误做点什么
    console.error('Error:', error);
    ElMessage.error(error.message || 'Error');
    return Promise.reject(error);
  }
);

export default service;
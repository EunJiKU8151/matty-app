import store from '@/store/index'


export function setInterceptors() {
  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    // 요청보내기 전 코드
    return config;
  }, function (error) {
    // 요청에러 처리
    return Promise.reject(error);
  });
  
  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // 응답을 받기 전에 처리
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // 응답에러 전처리
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
}
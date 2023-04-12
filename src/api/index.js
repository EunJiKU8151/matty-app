import axios from "axios";
import store from '@/store/index'

const instance = axios.create({
  baseURL: 'https://mattyapi.easymedia.co.kr/',
  // headers: {
  //   Authorization: store.state.username,
  // }
})
instance.interceptors.request.use(function (config) {
    // 요청보내기 전 코드
    config.headers.token = store.state.acessToken;
    console.log(config);
    return config;
  }, function (error) {
    // 요청에러 처리
    return Promise.reject(error);
  },
);
function loginUser(username) {
  return instance.post('api/Token', username);
}

function ezStoryGet() {
  return instance.get('api/EasyStory');
}

function personGet() {
  return instance.get('api/User', {
    params: {
      startdate: '2023-01-01',
      enddate: '2023-04-11',
      stype: 'new',
    }
  })
}

function bookitemGet() {
  return instance.get('api/Category');
}

export { loginUser, ezStoryGet, personGet, bookitemGet }
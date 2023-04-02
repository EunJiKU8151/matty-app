import axios from 'axios'
import store from '@/store/index'

const instance = axios.create({
  baseURL: "https://mattyapi.easymedia.co.kr/",
  // headers: {
  //   Authorization: store.state.token,
  // }
});

instance.interceptors.request.use(function (config) {
		// 요청보내기 전 코드
    console.log(config);
		config.headers.token = store.state.AccessToken;
		return config;
	}, function (error) {
		// 요청에러 처리
		return Promise.reject(error);
	},
);

// 로그인 API
function loginApi(userData) {
  return instance.post('api/Token', userData)
}

// 이지스토리 API
function ezStoryApi() {
  return instance.get('api/EasyStory')
}

export {
  loginApi,
  ezStoryApi
}
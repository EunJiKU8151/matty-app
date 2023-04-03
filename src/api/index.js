import axios from 'axios';
import store from '@/store/index';

const instance = axios.create({
  baseURL: "https://mattyapi.easymedia.co.kr/",
  // headers: {
  //   Authorization: store.state.token,
  // }
});

instance.interceptors.request.use(function (config) {
		// 요청보내기 전 코드
		config.headers.token = store.state.AccessToken;
		return config;
	}, function (error) {
		// 요청에러 처리
		return Promise.reject(error);
	},
);

// 로그인 API
function loginApi(userData) {
  return instance.post('api/Token', userData);
}

// 로그인 유저 정보 API
function userInfoApi() {
  // return instance.get('api/User/{id}');
  return instance.get('api/Vacation');
}
// function userInfoApi(userId) {
//   return instance.get('api/User/', {
//     params: {
//       id: userId
//     }
//   });
// }

// 이지스토리 API
function ezStoryApi() {
  return instance.get('api/EasyStory');
}

export {
  loginApi,
  userInfoApi,
  ezStoryApi,
}
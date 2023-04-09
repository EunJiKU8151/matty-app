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

// 해당 로그인 유저 정보 API
function thisUserInfoApi() {
  return instance.get('api/Vacation');
}

// 이지데이 API
function ezDayApi(firstDay, lastDay) {
  return instance.get('api/User', {
    params: {
      stype: 'easyday',
      startdate: firstDay,
      enddate: lastDay,
    }
  })
}

// 생일 API
function birthDayApi(firstDay, lastDay) {
  return instance.get('api/User', {
    params: {
      stype: 'birthday',
      startdate: firstDay,
      enddate: lastDay,
    }
  })
}

// 이지스토리 API
function ezStoryApi() {
  return instance.get('api/EasyStory');
}

// 신규 입사자 API
function newUserApi(firstDay, lastDay) {
  return instance.get('api/User', {
    params: {
      stype: 'new',
      startdate: firstDay,
      enddate: lastDay,
    }
  });
}

// 게시판 메뉴 API
function BoardMenuApi() {
  return instance.get('api/CommunityCategory');
}

// 게시판 API
function BoardApi(menu) {
  return instance.get('api/Community', {
    params: {
      c: menu,
      size: 5,
    }
  });
}

// 특정 유저 정보 API
function ThisUserApi(userId) {
  return instance.get(`api/User/${userId}`)
}

// 부서 Api
function contantApi() {
  return instance.get('api/User', {
    params: {
      dept: 595
    }
  })
}

export {
  loginApi,
  thisUserInfoApi,
  ezDayApi,
  birthDayApi,
  ezStoryApi,
  newUserApi,
  BoardMenuApi,
  BoardApi,
  ThisUserApi,
  contantApi
}
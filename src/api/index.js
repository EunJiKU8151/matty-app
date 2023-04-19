import axios from 'axios';
import store from '@/store/index';
import { dateCalculation } from '@/utils/dateCalculation.js';

// 올해 1월1일, 이번달 시작일, 이번달 마지막일 구하기
let date = dateCalculation();
let allFirstDay = date[0];
let firstDay = date[1];
let lastDay = date[2];
let nowDay = date[3];

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

//도서 카테고리 API
function bookItemGet() {
  return instance.get("api/Category");
}

//도서 카테고리 리스트
function BookListGet(id) {
  return instance.get("api/Book", {
    params: {
      c: id,
      p: 1
    }
  });
}

//도서 카테고리 리스트 더보기
function BookListMore(id, num) {
  return instance.get("api/Book", {
    params: {
      c: id,
      // p: num,
      size: 10 * num
    }
  });
}

//도서 홈 신규도서 API
function newBookGet() {
  return instance.get("api/Book");
}

//도서 홈 검색 API
function searchBookGet(seardata) {
  return instance.get("api/Book", {
    params: {
      field: "BOOK_TITLE",
      keyword: seardata,
      size: 80,
    }
  });
}

//도서 이달의 독서왕 API
function monthKingGet() {
  return instance.get("api/Rent");
}

// 이지데이 API
function ezDayApi() {
  return instance.get('api/User', {
    params: {
      stype: 'easyday',
      startdate: firstDay,
      enddate: lastDay,
    }
  })
}

// 생일 API
function birthDayApi() {
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
function newUserApi() {
  return instance.get('api/User', {
    params: {
      stype: 'new',
      startdate: allFirstDay,
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

// 회의실 API
function meetingRoomApi() {
  return instance.get('api/MeetingRoom', {
  })
}

// 미팅일정 API
function meetingSchApi() {
  return instance.get('api/Meeting', {
    params: {
      date: nowDay
    }
  })
}

// 특정 유저 정보 API
function ThisUserApi(userId) {
  return instance.get(`api/User/${userId}`)
}

// 부서 Api
function contantApi(dept) {
  return instance.get('api/User', {
    params: {
      dept: dept
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
  meetingRoomApi,
  meetingSchApi,
  ThisUserApi,
  contantApi,
  bookItemGet,
  newBookGet,
  monthKingGet,
  searchBookGet,
  BookListGet,
  BookListMore
}
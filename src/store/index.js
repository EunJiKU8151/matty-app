import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    UserId: localStorage.getItem("UserID") || '',
    AccessToken: localStorage.getItem("AccessToken") || '',
    RefreshToken: localStorage.getItem("AccessToken") || '',
  },
  getters: {
    // UserId값이 있으면, header&nav 보임
    isLogin(state) {
      return state.UserId !== '';
    }
  },
  mutations: {
    // 로그인 시, 아이디 저장
    loginUserIdSet(state, userid) {
      state.UserId = userid;
    },
    // 로그인 시, 토큰 저장
    loginUserAccessTokenSet(state, AccessToken) {
      state.AccessToken = AccessToken;
    },
    // 로그인 시, 토큰 저장
    loginUserRefreshTokenSet(state, RefreshToken) {
      state.RefreshToken = RefreshToken;
    },
    // 로그아웃 시, 아이디 삭제
    logOutUserIdRemove(state) {
      state.UserId = "";
    },
    // 로그아웃 시, 아이디 삭제
    logOutAccessTokenRemove(state) {
      state.AccessToken = "";
    },
    // 로그아웃 시, 아이디 삭제
    logOutRefreshTokenRemove(state) {
      state.RefreshToken = "";
    },
  },
  actions: {

  },
});

export default store;
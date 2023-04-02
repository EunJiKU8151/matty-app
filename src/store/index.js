import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    UserId: '',
    AccessToken: '',
    RefreshToken: '',
  },
  getter: {

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
    }
  },
  actions: {

  }
});

export default store;
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: localStorage.getItem("useid") || '',
    acessToken: localStorage.getItem("AccessToken") || '',
    refreshToken: localStorage.getItem("RefreshToken") || '',
  },
  getters: {
    // isLogin(state) {
    //   return state.username !== '';
    // },
  },
  mutations: {
    setUsername(state, userId) {
      state.userId = userId;
    },
    setAcessToken(state, acessToken) {
      state.acessToken = acessToken;
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;
    }
  },
});

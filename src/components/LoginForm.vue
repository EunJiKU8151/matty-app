<template>
  <div class="login-form">
    <form class="form" @submit.prevent="loginSubmit">
      <div class="id-input input-box">
        <label for="userid">이메일</label>
        <input v-model="userid" ref="userid" id="userid" type="text" placeholder="이메일을 입력해주세요.">
        <p class="posi error" v-show="!isIdEmailCheck && userid.length > 4">올바른 이메일 형식으로 입력해주세요.</p>
      </div>
      <div class="pwd-input input-box">
        <label for="userpw">비밀번호</label>
        <input v-model="passwd" ref="userpw" id="userpw" type="password" placeholder="비밀번호를 입력해주세요.">
      </div>
      <button class="btn" type="submit" @keydown.enter="loginSubmit">로그인</button>
    </form>
    <p class="error" v-show="idEmpty">이메일을 입력해주세요.</p>
    <p class="error" v-show="pwdEmpty">비밀번호를 입력해주세요.</p>
    <p class="error" v-show="loginError">로그인에 실패하였습니다.<br>이메일과 비밀번호를 확인해주세요.</p>
  </div>
</template>

<script>
  import { loginApi } from '@/api/index';
  import { validateEmail } from '@/utils/validation.js';

  export default {
    data() {
      return {
        userid: '',
        passwd: '',
        idEmpty: '',
        pwdEmpty: '',
        loginError: '',
      }
    },
    computed: {
      // 이메일 유효성 검사
      isIdEmailCheck() {
        return validateEmail(this.userid);
      }
    },
    methods: {
      // 로그인 버튼 클릭 시
      async loginSubmit() {
        try {
          const userData = {
            userid: this.userid,
            passwd: this.passwd,
          }
          const { data } =  await loginApi(userData);
          this.$store.commit('loginUserIdSet', this.userid)
          this.$store.commit('loginUserAccessTokenSet', data.AccessToken)
          this.$store.commit('loginUserRefreshTokenSet', data.RefreshToken)
          localStorage.setItem("UserID", this.userid);
          localStorage.setItem("AccessToken", data.AccessToken);
          localStorage.setItem("RefreshToken", data.RefreshToken);
          this.$router.push('/main');
        }
        catch(error) {
          if(this.userid == "") {
            this.idEmpty = true;
            this.pwdEmpty = false;
            this.loginError = false;
            this.$refs.userid.focus();
          } else if(this.passwd == "") {
            this.idEmpty = false;
            this.pwdEmpty = true;
            this.loginError = false;
            this.$refs.userpw.focus();
          } else {
            this.idEmpty = false;
            this.pwdEmpty = false;
            this.loginError = true;
            this.clearInput();
            this.$refs.userid.focus();
          }
          console.log("로그인 에러 : " + error);
          console.log(error);
        }
      },
      clearInput() {
        this.userid = "";
        this.passwd = "";
      }
    }
  }
</script>

<style lang="scss">
  body {background-color: #fff;}
</style>
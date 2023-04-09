<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="username">id:</label>
          <input id="username" type="text" v-model="username" />
          <p class="validation-text">
            <span class="warning" v-if="!isUsernameValid && username">
              Please enter an email address
            </span>
          </p>
        </div>
        <div>
          <label for="password">pw:</label>
          <input id="password" type="text" v-model="password" />
        </div>
        <button
          :disabled="!isUsernameValid || !password"
          type="submit"
          class="btn"
        >
          로그인
        </button>
      </form>
      <!-- <p class="log">{{ logMessage }}</p> -->
    </div>
  </div>
</template>

<script>
import { loginUser } from '@/api/index';
import { validateEmail } from '@/utils/validation';

export default {
  data() {
    return {
      // form values
      username: '',
      password: '',
      // log
      logMessage: '',
    };
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.username);
    },
  },
  methods: {
    async submitForm() {
      try {
        // 비즈니스 로직
        const userData = {
          userid: this.username,
          passwd: this.password,
        };
        const { data } = await loginUser(userData);
        console.log(data);
        this.$store.commit('setUsername', this.userid);
        this.$store.commit('setAcessToken', data.AccessToken);
        this.$store.commit('setRefreshToken', data.RefreshToken);
        // this.logMessage = `${data.user.username} 님 환영합니다`;
        // this.initForm();
        localStorage.setItem('useid', this.userid);
        localStorage.setItem('AccessToken', data.AccessToken);
        localStorage.setItem('RefreshToken', data.RefreshToken);
        this.$router.push('/main');
      } catch (error) {
        // 에러 핸들링할 코드
        console.log(error);
        // this.logMessage = error.response.data;
        // this.initForm();
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.username = '';
      this.password = '';
    },
  },
};
</script>

<style>
</style>

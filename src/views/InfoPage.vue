<template>
  <div>
    <div class="contact-sec sec">
      <div class="contact-list">
        <router-link :to="`/user/${item.E_IDX}`" v-for="item in myTeamUsers" :key="item.E_IDX" class="item">
          <div class="img-box">
            <img :src="`https://easymedia.matty.works:8443/File/Page1/Profile/${item.EMAIL}`" alt="">
          </div>
          <div class="txt-box">
            <p class="name">{{ item.NAME }}</p>
            <p class="info">
              <span>{{ item.DEPT_NAME }}</span> /
              <span>{{ item.CALL_NAME }}</span>
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { contantApi } from '@/api/index';

export default {
  data: function() {
    return {
        myTeamUsers: [],
      };
  },
  created() {
    contantApi()
      .then(({ data }) => {
        console.log(data);
        this.myTeamUsers = data;
      })
      .catch(error => {
        console.log("연락처 에러 : " + error);
        console.log(error);
      })
  }
}
</script>

<style lang="scss">
  body {background-color: #fff;}
</style>
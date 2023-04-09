<template>
  <div class="newuser-sec sec">
    <h2 class="sec-tit">신규 입사자</h2>
    <swiper ref="newSwiper" class="newSwiper" :options="swiperOption" role="tablist">
      <swiper-slide v-for="item in newUser" :key="item.E_IDX" role="tab">
        <p class="name">{{ item.NAME }}</p>
        <p class="info">
          <span>{{ item.DEPT_NAME }}</span> / 
          <span>{{ item.CALL_NAME }}</span>
        </p>
        <p class="contact">
          <span>M. {{ item.HP }}</span> / 
          <span>E. {{ item.EMAIL }}</span>
        </p>
        <p class="addr"> (주)이지미디어 /08380 서울특별시 구로구 디지털로 31길 20(구로동, 에이스테크노타워 5차 701호) </p>
        <p class="phone">Tel 02.869.3434 / Fax 02.869.3437</p>
        <p class="url">www.easymedia.co.kr</p>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.min.css';
import { newUserApi } from '@/api/index';

export default {
  name: 'newSwiper',
  data() {
    return {
      swiperOption: {
        slidesPerView: 1.1,
        spaceBetween: 10
      },
      newUser: []
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {
    let allFirstDay = this.$store.state.date.thisyearFirst;
    let lastDay = this.$store.state.date.nowDayLast;

    // 신규 입사자 API Get
    newUserApi(allFirstDay, lastDay)
      .then(({ data }) => {
        this.newUser = data;
      })
      .catch(error => {
        console.log("신규 입사자 에러 : " + error);
        console.log(error);
      })
  }
}
</script>

<style>
  body {background-color: #fff;}
</style>
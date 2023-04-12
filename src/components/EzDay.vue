<template>
  <div class="ezday-sec sec">
    <h2 class="sec-tit">기념일</h2>
    <div class="tab-head">
      <div class="tab-area">
        <button class="tab" :class="[ontab === 1 ? 'on' : '']" @click="tabClick(ontab = 1)">이지데이</button>
        <button class="tab" :class="[ontab === 2 ? 'on' : '']" @click="tabClick(ontab = 2)">생일자</button>
      </div>
      <button class="more-btn">더보기</button>
    </div>
    <swiper ref="daySwiper" class="daySwiper" :options="swiperOption" role="itemlist">
      <swiper-slide v-for="item in onContent" v-bind:key="item.TREEID" ref="item">
        <router-link :to="`/user/${item.E_IDX}`">
          <div class="img-box">
            <img :src="`https://easymedia.matty.works:8443/File/Page1/Profile/${item.EMAIL}`" alt="">
          </div>
          <div class="txt-box">
            <p class="name">{{ item.NAME }}</p>
            <template>
              <p class="day" v-if="ontab === 1">{{ item.easyday }}</p>
              <p class="birthday" v-else>{{ item.EI_BIRTH_DATE | MMdd }}</p>
            </template>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.min.css';
import { ezDayApi, birthDayApi } from '@/api/index';

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: "auto"
      },
      ezDayItems: [],
      ezBirthItems: [],
      ontab: 1,
    }
  },
  computed: {
    // onTab된 onConent 반환
    onContent() {
      if(this.ontab === 1) {
        return this.ezDayItems
      } else {
        return this.ezBirthItems
      }
    }
  },
  filters: {
    MMdd: function(value) {
      let itemDate = new Date(value);
      let month =  itemDate.getMonth() + 1;
      let day =  itemDate.getDate();

      if(month < 10) {
        month = `0${month}`;
      }
      if(day < 10) {
        day = `0${day}`;
      }
      
      return `${month}월 ${day}일`;
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {
    let firstDay = this.$store.state.date.nowDayFirst;
    let lastDay = this.$store.state.date.nowDayLast;

    // 이지데이 API Get
    ezDayApi(firstDay, lastDay)
      .then(({ data }) => {
        this.ezDayItems = data;
      }) 
      .catch(error => {
        console.log("이지데이 에러 : " + error);
        console.log(error);
      })

    // 생일 API Get
    birthDayApi(firstDay, lastDay)
      .then(({ data }) => {
        this.ezBirthItems = data;
      })
      .catch(error => {
        console.log("생일 에러 : " + error);
        console.log(error);
      })
  }
}
</script>

<style>

</style>
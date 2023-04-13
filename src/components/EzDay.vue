<template>
  <div class="ezday-sec sec">
    <h2 class="sec-tit">기념일</h2>
    <div class="tab-head">
      <div class="tab-area">
        <button class="tab" :class="[ontab === 1 ? 'on' : '']" @click="tabClick(ontab = 1)">이지데이</button>
        <button class="tab" :class="[ontab === 2 ? 'on' : '']" @click="tabClick(ontab = 2)">생일자</button>
      </div>
      <button class="more-btn" id="show-modal" @click="showModal = true">더보기</button>
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

    <ModalBox v-if="showModal" @close="showModal = false">
      <h3 slot="header">기념일</h3>
      <div slot="body">
        <div class="day-mwrap">
          <h4 class="mwrap-tit">EASYDAY</h4>
          <ul class="days-list">
            <li class="days-item">
              <p class="date">04월 01일</p>
              <ul class="users-list">
                <li class="users-item">
                  <div class="img-box">
                    <img src="" alt="">
                  </div>
                  <div class="txt-box">
                    <p class="name">정재헌</p>
                    <p class="position">차장</p>
                  </div>
                </li>
                <li class="users-item">
                  <div class="img-box">
                    <img src="" alt="">
                  </div>
                  <div class="txt-box">
                    <p class="name">정재헌</p>
                    <p class="position">차장</p>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="day-mwrap">
          <h4 class="mwrap-tit">BIRTHDAY</h4>
          <ul class="days-list">
            <li class="days-item">
              <p class="date">04월 01일</p>
              <ul class="users-list">
                <li class="users-item">
                  <div class="img-box">
                    <img src="" alt="">
                  </div>
                  <div class="txt-box">
                    <p class="name">정재헌</p>
                    <p class="position">차장</p>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </ModalBox>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.min.css';
import { ezDayApi, birthDayApi } from '@/api/index';
import ModalBox  from '@/components/common/ModalBox.vue'
// import { dateCalculation } from '@/utils/dateCalculation.js';

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: "auto"
      },
      ezDayItems: [],
      ezBirthItems: [],
      ontab: 1,
      showModal: true,
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
    swiperSlide,
    ModalBox
  },
  created() {
    // var date = dateCalculation();

    // let firstDay = date[1];
    // let lastDay = date[2];

    // 이지데이 API Get
    // ezDayApi(firstDay, lastDay)
    ezDayApi()
      .then(({ data }) => {
        this.ezDayItems = data;
        this.testFunc();
      }) 
      .catch(error => {
        console.log("이지데이 에러 : " + error);
        console.log(error);
      })

    // 생일 API Get
    // birthDayApi(firstDay, lastDay)
    birthDayApi()
      .then(({ data }) => {
        this.ezBirthItems = data;
      })
      .catch(error => {
        console.log("생일 에러 : " + error);
        console.log(error);
      })
  },
  methods: {
    testFunc() {
      this.ezDayItems.forEach((item) => {
        let date = new Date(item.ENTERING_DATE);
        let month =  date.getMonth() + 1;
        let day =  date.getDate();
        console.log(month, day);
      });
    }
  }
}
</script>

<style>

</style>
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
            <img :src="`${$store.state.userImgUrl}${item.EMAIL}`" alt="">
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
            <li class="days-item" v-for="(item, idx) in modalDayItems" :key="idx">
              <p class="date">{{ item[0].ENTERING_DATE | MMdd }}</p>
              <ul class="users-list">
                <li class="users-item" v-for="user in item" :key="user">
                  <div class="img-box">
                    <img :src="`${$store.state.userImgUrl}${user.EMAIL}`" alt="">
                  </div>
                  <div class="txt-box">
                    <p class="name">{{ user.NAME }}</p>
                    <p class="position">{{ user.CALL_NAME }}</p>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="day-mwrap">
          <h4 class="mwrap-tit">BIRTHDAY</h4>
          <ul class="days-list">
            <li class="days-item" v-for="(item, idx) in modalBirthItems" :key="idx">
              <p class="date">{{ item[0].EI_BIRTH_DATE | MMdd }}</p>
              <ul class="users-list">
                <li class="users-item" v-for="user in item" :key="user">
                  <div class="img-box">
                    <img :src="`${$store.state.userImgUrl}${user.EMAIL}`" alt="">
                  </div>
                  <div class="txt-box">
                    <p class="name">{{ user.NAME }}</p>
                    <p class="position">{{ user.CALL_NAME }}</p>
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
      modalDayItems: [],
      modalBirthItems: [],
      ontab: 1,
      showModal: false,
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
    // 이지데이 API Get
    // ezDayApi(firstDay, lastDay)
    ezDayApi()
      .then(({ data }) => {
        this.ezDayItems = data;
        this.modalSetEz();
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
        this.modalSetBirth();
      })
      .catch(error => {
        console.log("생일 에러 : " + error);
        console.log(error);
      })
  },
  methods: {
    // 이지데이 날짜별로 Set
    modalSetEz() {
      const ezDayData = this.ezDayItems.map(function(item) {
        let date = new Date(item.ENTERING_DATE);
        let day =  date.getDate();
        return day;
        }).reduce((setData, itemDay) => {
          if (setData.indexOf(itemDay) < 0) setData.push(itemDay)
          return setData
        }, []);

      const newEzList = ezDayData.map(itemDay => this.ezDayItems.filter(function(o) {
        let date = new Date(o.ENTERING_DATE);
        let day =  date.getDate();
        return day === itemDay;
      }));

    this.modalDayItems = newEzList;
    },
    // 생일 날짜별로 Set
    modalSetBirth() {
      const birthDayData = this.ezBirthItems.map(function(item) {
        let date = new Date(item.EI_BIRTH_DATE);
        let day =  date.getDate();
        return day;
        }).reduce((setData, itemDay) => {
          if (setData.indexOf(itemDay) < 0) setData.push(itemDay)
          return setData
        }, []);

      const newBirthList = birthDayData.map(itemDay => this.ezBirthItems.filter(function(o) {
        let date = new Date(o.EI_BIRTH_DATE);
        let day =  date.getDate();
        return day === itemDay;
      }));

    this.modalBirthItems = newBirthList;
    }
  }
}
</script>

<style>

</style>
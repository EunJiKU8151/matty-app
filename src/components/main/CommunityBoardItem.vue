<template>
  <div class="board-sec sec">
    <h2 class="sec-tit">게시판</h2>
    <div class="tab-area">
      <swiper ref="boardTabSwiper" class="boardTabSwiper" :options="swiperOption" role="tablist">
        <swiper-slide :class="[ontab === idx + 1 ? 'on' : '']" v-for="(item, idx) in boardMenu" v-bind:key="idx" role="tab">
          <a href="javascript:" v-on:click="tabClick(item.CATEID, idx)">{{ item.BBSNAME }}</a>
        </swiper-slide>
      </swiper>
    </div>
    <div v-if="!(boardItems == '')" class="board-area">
      <a v-for="item in boardItems" :key="item.BBSDATAID" href="javascript:" class="board">
        <div class="img-box">
          <figure class="img"><img :src="`${$store.state.userImgUrl}${item.USERID}`" alt=""></figure>
          <p class="name">{{ item.USERNAME }}</p>
        </div>
        <div class="txt-box">
          <p class="tit">{{ item.TITLE }}</p>
          <div class="txt">
            <p class="like">
              <i class="fa-solid fa-heart"></i>
              <span>{{ item.CNT_RECMD }}</span>
            </p>
            <p class="view">
              <i class="fa-regular fa-eye"></i>
              <span>{{ item.CNT_READ }}</span>
            </p>
            <p class="date">
              {{ item.REGDATE | yyMMdd }}
            </p>
          </div>
        </div>
      </a>
    </div>
    <div v-else class="no-board">
      <p class="txt">내용이 없습니다.</p>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.min.css';
import { boardMenuApi, boardApi } from '@/api/index';

export default {
  name: 'boardTabSwiper',
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 10
      },
      boardMenu: [],
      activeMenu: "NOTICE",
      boardItems: [],
      ontab: 1,
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  filters: {
    yyMMdd: function(value) {
      let itemDate = new Date(value);
      let year = itemDate.getFullYear();
      let month =  itemDate.getMonth() + 1;
      let day =  itemDate.getDate();
      
      if(month < 10) {
        month = `0${month}`;
      }
      if(day < 10) {
        day = `0${day}`;
      }

      return `${year}-${month}-${day}`;
    }
  },
  methods: {
    // tab click
    tabClick(menu, idx) {
      this.activeMenu = menu;
      this.ontab = idx + 1;

      this.BoardGet(menu);
    },
    // 게시판 API Get
    BoardGet(menu) {
      boardApi(menu)
        .then(({ data }) => {
          this.boardItems = data;
        })
        .catch(error => {
          console.log("게시판 에러 : " + error)
          console.log(error)
        })
      }
  },
  created() {
    // 게시판 메뉴 API Get
    boardMenuApi()
      .then(({ data }) => {
        this.boardMenu = data;
      })
      .catch(error => {
        console.log("게시판 메뉴 에러 : " + error)
        console.log(error)
      })

    // 게시판 API Get
    this.BoardGet();
  }
}
</script>

<style>
  body {background-color: #fff;}
</style>
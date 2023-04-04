<template>
  <div class="board-sec sec">
    <h2 class="sec-tit">게시판</h2>
    <div class="tab-area">
      <swiper ref="boardTabSwiper" class="boardTabSwiper" :options="swiperOption" role="tablist">
        <swiper-slide v-for="item in boardMenu" v-bind:key="item.BBSCATEID" role="tab">
          <a href="javascript:" v-on:click="tabClick(item.CATEID)">{{ item.BBSNAME }}</a>
        </swiper-slide>
      </swiper>
    </div>
    <div v-if="!(boardItems == '')" class="board-area">
      <a v-for="item in boardItems" :key="item.BBSDATAID" href="javascript:" class="board">
        <div class="img-box">
          <figure class="img"><img src="" alt=""></figure>
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
              {{ item.REGDATE }}
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
import { BoardMenuApi, BoardApi } from '@/api/index';

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
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    // tab click
    tabClick(menu) {
      this.activeMenu = menu;
      console.log(this.activeMenu);

      this.test(menu);
    },
    // 게시판 API
    test(menu) {
      BoardApi(menu)
        .then(({ data }) => {
          console.log(data);
          this.boardItems = data;
        })
        .catch(error => {
          console.log("게시판 에러 : " + error)
          console.log(error)
        })
      }
  },
  created() {
    // 게시판 메뉴 API
    BoardMenuApi()
      .then(({ data }) => {
        this.boardMenu = data;
      })
      .catch(error => {
        console.log("게시판 메뉴 에러 : " + error)
        console.log(error)
      })

    // 게시판 API
    this.test();
  }
}
</script>

<style>
  body {background-color: #fff;}
</style>
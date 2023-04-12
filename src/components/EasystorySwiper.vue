<template>
  <div class="sect-area">
    <p class="component_tit">이지스토리</p>
    <swiper class="ezstorySlide" :options="swiperOption">
      <swiperSlide class="slide-item" v-for="item in ezItem" :key="item.num">
        <p class="swipe-title">{{ item.TITLE }}</p>
        <img :src="item.ThumbFileUrl"/>
      </swiperSlide>
    </swiper>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import { ezStoryGet } from '@/api/index';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.min.css';

export default {
  created() {
    ezStoryGet()
      .then(({ data }) => {
        // console.log(data);
        this.ezItem = data;
      })
      .catch(error => {
        console.log(error);
      })
  },
  name: 'ezstorySlide',
  data() {
    return {
      swiperOption: {
        slidesPerView: '1',
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
      },
      ezItem: [],
    }
  },
  components: {
    swiper,
    swiperSlide
  },
}
</script>
<style>
.sect-area {width: calc(100% - 16px); margin: 0 auto;}
.sect-area + .sect-area {margin-top: 60px;}
.ezstorySlide {height: 300px;}
.component_tit {position: relative; padding-left: 20px; font-size: 20px; font-weight: bold; text-align: left;}
.component_tit::before {content: ""; position: absolute; left: 8px; top: 50%; height: 80%; width: 4px; transform: translateY(-50%); background-color: #000;}
.slide-item {position: relative;}
.slide-item::after {content: ""; position: absolute; left: 0; right: 0; bottom: 0; top: 0; background: linear-gradient(transparent, transparent, black);}
.slide-item img {width: 100%; height: 100%; object-fit: cover;}
.swipe-title {z-index: 1; position: absolute; left: 30px; bottom: 10px; font-weight: 700; color: #fff;}
.swiper-pagination {left: 50%; transform: translateX(-50%); margin-top: 10px;}
.swiper-pagination .swiper-pagination-bullet {display: inline-block;}
.swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active {width: 30px; border-radius: 10px; background-color: black;}
.swiper-pagination .swiper-pagination-bullet + .swiper-pagination-bullet {margin-left: 10px;} 
</style>
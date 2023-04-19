<template>
  <div class="ezstory-sec sec">
    <h2 class="sec-tit">이지스토리</h2>
    <swiper ref="ezSwiper" class="ezSwiper" :options="swiperOption" role="tablist">
      <swiper-slide v-for="item in ezStoryItems" v-bind:key="item.IDX" role="tab">
        <a :href="item.LinkUrl">
          <div class="img-box">
            <img :src="item.ThumbFileUrl" alt="">
          </div>
          <p class="tit">{{ item.TITLE }}</p>
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div> 
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.min.css';
import { ezStoryApi } from '@/api/index';

export default {
  name: 'ezSwiper',
  data () {
    return {
      swiperOption: {
        slidesPerView: '1',
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
      },
      ezStoryItems: [],
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  async created () {
    try {
      // 이지스토리 Api Get
      const { data } = await ezStoryApi();
      this.ezStoryItems = data;
    }
    catch(error) {
      console.log("이지스토리 에러 : " + error);
      console.log(error);
    }
  }
}
</script>

<style lang="scss" scoped>
  body {background-color: #fff;}
</style>
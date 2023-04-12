<template>
  <div class="sect-area">
    <p class="component_tit">신규 입사자</p>
    <swiper class="personSlide" :options="swiperOption">
      <swiper-slide class="person-slide" v-for="item in personItem" :key="item.num">
        <div class="item-card">
          <p>{{ item.NAME }}</p>
          <p>
            <span>{{ item.CALL_NAME }}</span> /
            <span>{{ item.DEPT_NAME }}</span>
          </p>
          <p>{{ item.EMAIL }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { personGet } from "@/api/index";
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.min.css';


export default {
  created() {
    personGet()
      .then(({ data }) => {
        console.log(data);
        this.personItem = data;
      })
      .catch(error => {
        console.log(error);
      })
  },
  name: 'personSlide',
  data() {
    return {
      personItem: [],
      swiperOption: {
        slidesPerView: '1.1',
        spaceBetween: 10,
      },
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style scoped>
.personSlide {padding: 5px;}
.person-slide {height: 200px;}
.item-card {height: 100%; padding: 20px 30px; box-shadow: 0 1px 4px rgba(0,0,0,.2); box-sizing: border-box;}
</style>
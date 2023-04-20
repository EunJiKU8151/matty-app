<template>
  <div>
    <div class="newbook-sec sec">
      <h2 class="sec-tit">신규 도서</h2>
      <div class="search-form">
        <label for="search-book">EzLibrary</label>
        <div class="input-wrap">
          <input id="search-book" type="text" placeholder="검색할 도서를 입력해주세요." v-model="searchbook" @keyup.enter="booksearch()">
          <button type="button" @click="booksearch()">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <swiper class="newbookSlide" :options="swiperOption">
        <swiper-slide v-for="item in newbookItem" :key="item.num">
          <div class="ig-box">
            <img :src="`${$store.state.bookImgUrl}${item.BOOK_UKEY}`" alt="">
          </div>
          <div class="txt-box">
            <p class="book-title">{{ item.BOOK_TITLE }}</p>
            <p class="author">{{ item.BOOK_AUTHOR }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="bookking-sec sec">
      <h2 class="sec-tit">이달의 독서왕</h2>
      <ul>
        <li v-for="(person, idx) in bookKingList" :key="person.index">
          <div class="left-area">
            <span>{{ idx + 1 }}</span>
            <div class="person-ig">
              <span v-if="idx == 0">
                <i class="fa-solid fa-crown"></i>
              </span>
              <img :src="`https://easymedia.matty.works:8443/File/Page1/Profile/${person.rentId}`" alt="">
            </div>
          </div>
          <div class="name-box">
            <p class="name">{{ person.rentName }}</p>
            <p class="part-area">
              <span class="part">{{ person.rentDeptName }}</span> / 
              <span class="rank">{{ person.rentCallName }}</span>
            </p>
          </div>
          <div class="rent-box">
            <p>
              <i class="fa-solid fa-book"></i>
              <span>{{ person.rentCount }}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <ModalBox v-if="showModal" @close="showModal = false">
      <div slot="body">
        <p class="book-modal-tit">
          "<span>{{ searchbook }}</span>" 이 포함된 검색 결과입니다.
        </p>
        <ul class="book-modal-list">
          <li v-for="book in searchList" :key="book.idx">
            <div class="ig-book">
              <img :src="`${$store.state.bookImgUrl}${book.BOOK_UKEY}`" alt="">
            </div>
            <div class="book-text">
              <p class="tit">{{ book.BOOK_TITLE }}</p>
              <p class="catagory">{{ book.BOOK_GB_TITLE }}</p>
              <p class="author">작가: {{ book.BOOK_AUTHOR }}</p>
              <p class="publish">출판사: {{ book.BOOK_PUBLISHER }}</p>
            </div>
          </li>
        </ul>
      </div>
    </ModalBox>
  </div>
</template>

<script>
import { newBookGet, monthKingGet, searchBookGet } from '@/api/index';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.min.css';
import ModalBox from '@/components/common/ModalBox.vue';

export default {
  data() {
    return {
      newbookItem: [],
      bookKingList: [],
      swiperOption: {
        slidesPerView: '1',
      },
      showModal: false,
      searchbook: '',
      searchList: [],
    }
  },
  name: 'newbookSlide',
  created() {
    newBookGet()
      .then(({ data }) => {
        console.log(data.field);
        this.newbookItem = data;
      })
      .catch(error => {
        console.log(error);
      });
    monthKingGet()
      .then(({ data }) => {
        // console.log(data);
        this.bookKingList = data;
      })
      .catch(error => {
        console.log(error);
      })
  },
  components: {
    swiper,
    swiperSlide,
    ModalBox
  },
  methods: {
    //input에 값이 있을경우
    booksearch(){
      const seardata = this.searchbook;

      searchBookGet(seardata)
        .then(({ data }) => {
          console.log(data);
          this.searchList = data;
          if(data.length <= 0 || this.searchbook.length <= 0){
            this.nosearch();
          } else {
            this.showModal = true;
          }
        })
        .catch(error => {
          console.log(error);
        })

    },
    //input에 값이 없을 경우
    nosearch() {
      alert("검색 결과가 없습니다.");
      this.showModal = false;
    },
    //input에 값이 있는지 체크
    // searchCheck() {
    //   return this.searchbook.length <= 0 ? this.nosearch() : this.booksearch();
    // }
  }
}
</script>

<style>

</style>
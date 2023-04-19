<template>
  <div>
    <ul class="book-list">
      <li class="book-item" v-for="bookList in bookLists" :key="bookList.idx" @click="catashow(bookList.TREEID, bookList.TITLE)">
        <p class="book-cata-title">{{ bookList.TITLE }}</p>
      </li>
    </ul>
    <ModalBox v-if="showModal" @close="[showModal = false, closeModal()]">
      <h3 slot="header">{{ bookTitle }}</h3>
      <div slot="body">
        <ul class="book-modal-list">
          <li v-for="modalBook in modalBooks" :key="modalBook.idx">
            <div class="ig-book">
              <!-- 
                tip
                자주 쓰이는 url은 ENV 파일에 담아보세용
               -->
              <img :src="`https://www.ezcampus.kr:444/File/Details/${modalBook.BOOK_UKEY}`" alt="">
            </div>
            <div class="book-text">
              <p class="tit">{{ modalBook.BOOK_TITLE }}</p>
              <p class="catagory">{{ modalBook.BOOK_GB_TITLE }}</p>
              <p class="author">작가: {{ modalBook.BOOK_AUTHOR }}</p>
              <p class="publish">출판사: {{ modalBook.BOOK_PUBLISHER }}</p>
            </div>
          </li>
        </ul>
        <div class="btn-wrap">
          <button type="button" class="btn-more" @click="[clickbtn()]" v-if="btnShow">더보기</button>
        </div>
      </div>
    </ModalBox>
  </div>
</template>

<script>
import { bookItemGet, BookListGet, BookListMore } from '@/api/index';
import ModalBox from '@/components/common/ModalBox.vue';

export default {
  data() {
    return {
      bookLists: [],
      showModal: false,
      booktitle: '',
      titlenum: '',
      modalBooks: [],
      bookTitle: [],
      clickdata: 1,
      btnShow: true
    }
  },
  components: {
    ModalBox,
  },
  created() {
    bookItemGet()
    .then(({ data }) => {
      console.log(data);
      this.bookLists = data; 
    })
    .catch(error => {
      console.log(error);
    })
  },
  methods: {
    //카테고리 버튼 클릭시 모달 열기
    catashow(id, name) {
      this.titlenum = id;
      BookListGet(id)
      .then(({ data }) => {
        console.log(data);
        this.modalBooks = data;
        this.bookTitle = name;
        this.showModal= true;
      })
      .catch(error => {
        console.log(error);
      })
    },
    //모달 닫을 경우 빈값 만들기
    closeModal() {
      this.modalBooks = "";
      this.bookTitle = "";
      this.clickdata = 1 ;
      this.btnShow = true;
    },
    //더보기 버튼 클릭
    clickbtn() {
      this.clickdata++;
      this.morebook();
    },
    // 더보기 버튼 클릭시 해당 값 추가로 불러오기
    morebook() {
      var titledata = this.titlenum;
      var clicknum = this.clickdata;
      BookListMore(titledata, clicknum)
      .then(({ data }) => {
        console.log(data.length);
        console.log(this.modalBooks.length);
        if (data.length > this.modalBooks.length) {
          if (data.length == this.modalBooks.length) {
            this.btnShow = false; 
          } else {
            this.modalBooks = data;
          }
        } else {
          this.btnShow = false;
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
}
</script>

<style>
  
</style>

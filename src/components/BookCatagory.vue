<template>
  <div>
    <ul class="book-list">
      <li class="book-item" v-for="bookList in bookLists" :key="bookList.idx" @click="catashow(bookList.TREEID, bookList.TITLE)">
        <p class="book-cata-title" ref="getTitle">{{ bookList.TITLE }}</p>
      </li>
    </ul>
    <ModalBox v-if="showModal" @close="[showModal = false, closeModal()]">
      <!-- <h3 slot="header">{{ bookList.BOOK_GB_TITLE }}</h3> -->
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
        <button type="button" @click="morebook(id)">더보기</button>
      </div>
    </ModalBox>
  </div>
</template>

<script>
import { bookItemGet, BookListGet } from '@/api/index';
import ModalBox from '@/components/common/ModalBox.vue';

export default {
  data() {
    return {
      bookLists: [],
      showModal: false,
      booktitle: '',
      modalBooks: [],
      bookTitle: [],
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
    catashow(id, name) {
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
    closeModal() {
      this.modalBooks = "";
      this.bookTitle = "";
    },
    // morebook(id) {
    //   // console.log(id);
    // }
  }
}
</script>

<style>
  
</style>

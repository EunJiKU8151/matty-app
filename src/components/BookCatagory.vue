<template>
  <div>
    <ul class="book-list">
      <li class="book-item" v-for="bookList in bookLists" :key="bookList.TLEFT" @click="showModal = true">
        <p class="book-cata-title">{{ bookList.TITLE }}</p>
      </li>
    </ul>
    <ModalBox v-if="showModal" @close="showModal = false">
      <h3 slot="header">이름</h3>
      <div slot="body">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam reprehenderit cupiditate, inventore quisquam temporibus praesentium qui voluptates sapiente dignissimos. Quae facilis nesciunt neque quos! Repellendus aliquam numquam esse sit nemo. Laboriosam reiciendis quam saepe quos unde iure laudantium aut recusandae minima consectetur maiores, voluptatem nisi doloribus quae facere, dolor, ullam mollitia optio sequi adipisci consequatur inventore? Optio, beatae. Ad a neque deleniti repellendus voluptatem ex dolorem quam, architecto exercitationem, sint illo in? Voluptatibus rem sint reprehenderit cupiditate accusantium odio doloribus voluptates laudantium officiis fugiat laboriosam saepe molestias harum, consequatur optio commodi veniam enim laborum in expedita. Delectus error dolorum, ab ex accusantium, nam adipisci doloremque quo natus voluptatem nobis non obcaecati laudantium debitis nostrum facilis porro provident laborum aperiam consequatur sunt rerum molestiae? Illo voluptas tenetur tempora, voluptatum officiis minus enim sapiente natus. Temporibus magni nemo ex deserunt, molestiae reprehenderit? Tempore exercitationem rem, mollitia ut eius molestias corporis temporibus alias quaerat libero odio quia reiciendis sequi quo, ad, et velit at quae est! Itaque, impedit, molestiae ipsum est obcaecati ad maxime velit vel sint commodi voluptate animi temporibus ab? Soluta, deleniti ut quas et sint deserunt commodi illum sequi assumenda vero libero reiciendis unde veritatis voluptatem illo architecto velit tempore quia nemo nesciunt voluptate molestiae animi. Asperiores repellendus nulla, praesentium laudantium obcaecati ipsam sed. Quisquam neque quidem commodi facere, iure expedita in tempore saepe dignissimos natus at ducimus dolorem consectetur quasi delectus, dicta laudantium! Vero dolorum perferendis modi veritatis provident aspernatur doloribus itaque? Aliquam odit adipisci nesciunt nemo architecto inventore! Illum reiciendis cumque nemo tempora impedit id voluptatum veritatis aut eligendi aperiam, distinctio eveniet voluptas nulla iure doloremque error culpa sapiente, autem eos corporis voluptates numquam commodi! Illo tenetur blanditiis tempora doloremque minima, harum ut laborum architecto deleniti ad suscipit sapiente rem accusantium voluptas iure possimus nobis voluptatibus tempore atque alias officiis doloribus iste. Voluptatum eius natus reiciendis maxime veritatis aspernatur deleniti, soluta commodi, velit suscipit pariatur quia neque impedit quaerat nobis numquam? Laudantium aspernatur quo tenetur saepe dignissimos laborum dolore voluptatum iure accusamus tempora recusandae et ipsam mollitia asperiores earum iusto beatae ea corrupti facilis repudiandae, assumenda temporibus ullam. Fuga delectus velit fugiat? Quae, non. Pariatur similique sequi nam harum labore illum in laborum quia? Doloremque cumque magni dolore iure eius libero ut dolorem, molestias sint consequuntur ullam aliquam, praesentium quo repudiandae quia explicabo, tenetur at placeat expedita enim sunt ea quam voluptatem architecto! Porro voluptates ratione placeat vel!</p>
        <button>더보기</button>
      </div>
    </ModalBox>
  </div>
</template>

<script>
import { bookItemGet } from '@/api/index';
import ModalBox from '@/components/common/ModalBox.vue';

export default {
  data() {
    return {
      bookLists: [],
      showModal: false,
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
  }
}
</script>

<style>
  
</style>
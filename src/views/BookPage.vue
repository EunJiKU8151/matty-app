<template>
  <div>
    <booktoolBar></booktoolBar>
  </div>
</template>

<script>
import booktoolBar from '@/components/BooktoolBar.vue';

export default {
  components: {
    booktoolBar,
  }
}

// import { bookitemGet } from "@/api/index";

// export default {
//   created() {
//     bookitemGet()
//       .then(({ data }) => {
//         console.log(data);
//         // this.bookItem = data;
//       })
//       .catch(error => {
//         console.log(error);
//       })
//   },
//   data() {
//     return {
//       bookItem: []
//     }
//   }
// }
</script>

<style>

</style>
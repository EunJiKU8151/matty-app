<template>
  <div>
    ezstory
  </div>
</template>

<script>
import axios from "axios";
export default {
  created () {
    axios.get("https://mattyapi.easymedia.co.kr/api/User")
      .then((response) => {
        console.log(response.data);
      })
      .catch()
  },
}
</script>

<style>

</style>

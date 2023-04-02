<template>
  <div class="not-page page">
    <div class="txt-box">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <p class="big-txt">404</p>
      <p class="txt">페이지를 찾을 수 없습니다.</p>
      <router-link to="/main">
        <i class="fa-solid fa-arrow-left"></i>
        <span>메인으로 돌아가기</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .not-page {padding: 80px 0;}
  .not-page .txt-box {text-align: center;}
  .not-page .txt-box i.fa-triangle-exclamation {font-size: 150px; color: $point_color;}
  .not-page .txt-box .big-txt {margin: 20px 0 10px; font-size: 60px; font-weight: 600; color: $black_color;}
  .not-page .txt-box .txt {color: $black_color;}
  .not-page .txt-box a {display: inline-block; padding: 4px 10px; margin-top: 26px; font-size: 12px; color: $point_color; border: 1px solid $point_color;}
  .not-page .txt-box a i {margin-right: 4px;}
</style>
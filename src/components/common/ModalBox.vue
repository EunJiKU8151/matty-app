<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
            </slot>
          </div>

          <button class="modal-close-btn" @click="$emit('close')">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

</script>

<style lang="scss">
  .modal-mask {position: fixed; z-index: 9998; top: 0; left: 0; display: table; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); transition: opacity 0.3s ease;}
  .modal-wrapper {display: table-cell; vertical-align: middle;}
  .modal-container {position: relative; width: 85%; height: 80vh; overflow: auto; margin: 0px auto; padding: 20px 30px; border-radius: 2px; background-color: #fff; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33); transition: all 0.3s ease;}
  .modal-header h3 {font-size: 18px; font-weight: 500; color: $point_color;}
  .modal-body {margin: 20px 0;}
  .modal-close-btn {position: absolute; top: 10px; right: 10px;}
  /*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */
  .modal-enter {opacity: 0;}
  .modal-leave-active {opacity: 0;}
  .modal-enter .modal-container, .modal-leave-active .modal-container {-webkit-transform: scale(1.1); transform: scale(1.1);}
</style>
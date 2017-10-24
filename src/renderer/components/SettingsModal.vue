<template>
  <div>
  <div id="background" v-on:click="toggleSettings"></div>
  <div id="modal">
    Add settings here
  </div>
  </div>
</template>

<script>
  export default {
    props: ['toggleSettings']
  }
</script>

<style lang="stylus">
  $link = #0E6ABF
  $text = #1C1C1A

  #background
    width 100vw
    height 100vh
    position absolute
    z-index 90
    left 0px
    top 0px

  #modal
    background-color #e3e3ea
    width calc(100vw - 100px)
    height calc(100vh - 100px)
    position absolute
    left 50px
    top 50px
    z-index 100
    box-shadow 0px 2px 16px 2px #666
    border 1px solid lighten($link, 70%)
    box-sizing border-box
    padding 10px
</style>

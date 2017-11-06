<template>
  <div id="container">
    <div v-for="(cat, index) in categories" v-bind:key="cat.name" v-bind:style="{ order: index }" class="category">
      <div class="inset">
        <h3>{{ cat.name }}</h3>
        <router-link v-for="article in cat.articles" v-bind:key="article" :to="{ name: 'article', params: { name: article }}">{{article}}</router-link>
      </div>
    </div>
    <div class="category" v-bind:style="{ order: Object.keys(categories).length }">
      <div class="inset">
        <router-link to="add/category" id="newCat">New Category</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      categories () {
        return this.$store.state.Data.categories
      }
    }
  }
</script>

<style lang="stylus">
  $link = #0E6ABF
  $text = #1C1C1A

  #container
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content center
    height 100%
    align-content flex-start
    align-items stretch
    margin 0 -10px
    font-family 'Open Sans', sans
    font-size 13px
    line-height 18px

    h3
      font-family 'Merriweather', serif
      font-weight 400
      font-size 22px
      margin 10px

    a
      margin-left 12px

      &:last-of-type
        margin-bottom 10px

  .category
    flex 1 1 auto
    margin-bottom 20px
    min-width 200px
    min-height 60px
    padding 0 10px
  
  .inset
    height 100%
    position relative
    border 1px solid #71a7d6
    box-sizing border-box

  #newCat
    position relative
    top calc(50% - 12px)
    text-align center
    margin 0 !important 
</style>
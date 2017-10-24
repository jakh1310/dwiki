<template>
  <div>
    <div class="container" v-for="category in categories" v-bind:key="category.name">
      <router-link :to="{ name: 'category-edit', params: { name: category.name }}"><h4>{{ category.name }}</h4></router-link>
      <ul>
        <li v-for="article in category.articles" v-bind:key="article">{{ article }}</li>
      </ul>
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

<style lang="stylus" scoped>
  h4
    font-family 'Merriweather', serif
    margin 0
    margin-bottom 4px
    font-size 14px

  ul
    margin 0

  li
    font-family 'Open Sans', sans
    font-size 14px
    margin-top 1px
</style>

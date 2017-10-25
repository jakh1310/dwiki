<template>
  <div>
    <router-link v-for="article in articles" v-bind:key="article.name" :to="{ name: 'article', params: { name: article.name }}">{{article.name}}</router-link>
  </div>
</template>

<script>
  export default {
    computed: {
      articles () {
        return this.$store.state.Data.articles
      }
    }
  }
</script>

<style lang="stylus">

</style>

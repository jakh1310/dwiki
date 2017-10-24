<template>
  <div>
    <router-link v-for="article in articles" v-bind:key="article" :to="{ name: 'article', params: { name: article }}">{{article}}</router-link>
  </div>
</template>

<script>
  export default {
    computed: {
      articles () {
        const obj = this.$store.state.Data.articles
        const articles = []

        for (let item in obj) {
          articles.push(item)
        }
        
        return articles.sort()
      }
    }
  }
</script>

<style lang="stylus">

</style>

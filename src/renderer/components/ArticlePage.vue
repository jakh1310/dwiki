<template>
  <div>
    <router-link v-for="article in articles" v-bind:key="article.name" :to="{ name: 'article', params: { name: article.name }}">{{article.name}}</router-link>
  </div>
</template>

<script>
  export default {
    computed: {
      articles () {
        const art = this.$store.state.Data.articles
        let arr = []

        Object.keys(art).forEach((key) => {
          arr.push(art[key])
        })

        arr.sort((a, b) => {
          let textA = a.name.toUpperCase()
          let textB = b.name.toUpperCase()
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
        })

        return arr
      }
    }
  }
</script>

<style lang="stylus">

</style>

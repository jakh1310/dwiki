<template>
  <div>
    
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
    },
    created () {
      this.chooseRandomArticle()
    },
    methods: {
      chooseRandomArticle () {
        let len = this.articles.length
        let articleNum = Math.floor(Math.random() * len)
        this.$router.push('/article/'+this.articles[articleNum].name)
      }
    }
  }
</script>

<style lang="stylus">

</style>
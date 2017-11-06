<template>
  <div>
    <h1 id="wiki-title">{{ article.name }}</h1>
    <router-link :to="{ name: 'article-edit', params: { name: article.name }}" id="edit-button">Edit</router-link>
    <div id="remove-button" v-on:click="removeArticle()">Remove</div>
    <hr>
    <div v-html="article.content"></div>
  </div>
</template>

<script>
  import { wt } from '../modules'

  export default {
    computed: {
      article () {
        return this.$store.getters.getArticle(this.$route.params.name)
      }
    },
    created () {
      this.checkLinksExist()
    },
    watch: {
      // Fixes navigating from one article to another not coloring links properly
      '$route': 'checkLinksExist'
    },
    methods: {
      checkLinksExist () {
        const regex = /<a href='#\/article\/(.+?)'>/g
        let arr
        while ((arr = regex.exec(this.article.content)) !== null) {
          let reg = new RegExp(`<a href='#/article/${arr[1]}'>`, 'g')
          this.article.content = this.article.content.replace(reg, `<a href='#/article/${arr[1]}' class='${ !this.$store.getters.checkArticle(arr[1]) ? 'no-exists' : '' }'>`)
        }
      },
      removeArticle () {
        this.$store.commit('removeArticle', { name: this.$route.params.name })
        this.$router.replace('/articles')
      }
    }
  }
</script>

<style lang="stylus">
  $link = #0E6ABF
  $text = #1C1C1A

  p
    font-family 'Open Sans', sans
    font-size 14px
    margin-top 3px

  p > a
    display inline    
    
  #remove-button
    font-family 'Open Sans', sans
    font-size 14px
    line-height 20px
    color $link
    display block
    text-decoration none
    cursor pointer    
    position absolute
    text-align right
    top 6px
    right 20px

    &:hover
      text-decoration underline

  #wiki-title
    //font-variant small-caps
    font-family 'Merriweather', serif
    font-weight 400
    font-size 24px

  .italics
    font-style italic

  .bold
    font-weight bold

  .strike
    text-decoration line-through

  .underline
    text-decoration underline

  .ext
    color darken(green, 20%)

  .no-exists
    color darken(red, 30%)

  #edit-button
    position absolute
    text-align right
    top 6px
    right 80px
    margin 0

  h1, h2, h3, h4
    font-family 'Merriweather', serif
    margin 0

  h2
    font-size 20px
    margin-top 24px
    font-weight 400

  h3
    font-size 16px
    margin 0
    
  h4
    font-size 14px
    margin 0

  hr
    border 0
    border-bottom 1px solid lighten($text, 60%)
</style>
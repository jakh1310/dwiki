<template>
  <div>
    <input type="text" name="article-name" id="edit-name" v-model="name"></input>
    <hr>
    <textarea name="article-content" id="edit-content" cols="30" rows="10" v-model="content"></textarea>
    <button v-on:click="editPage()">Save</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        content: ''
      }
    },
    mounted () {
      const article = this.$store.getters.getArticle(this.$route.params.name)
      this.name = article.name
      this.content = article.raw
    },
    methods: {
      editPage () {
        const article = {
          name: this.name,
          content: this.content
        }

        // Check if article name is edited
        if (this.$route.params.name !== article.name) {
          if (!this.$store.getters.checkArticle(this.name)) {
            this.$store.commit('removeArticle', { name: this.$route.params.name })
            this.$store.commit('addArticle', article)
            this.$store.commit('editCategoryArticle', { oldName: this.$route.params.name, newName: article.name })
          } else {
            this.$store.commit('editArticle', { name: this.$route.params.name, content: article.content })
          }
        } else {
          this.$store.commit('editArticle', article)
        }
        this.$router.replace('/article/' + article.name)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  $link = #0E6ABF
  $text = #1C1C1A

  div
    height calc(100% - 80px)

  textarea
    color $text
    font-size 14px
    width 100%
    height calc(100% - 16px)
    border 1px solid lighten($link, 70%)
    border-style solid
    resize none
    padding 6px
    outline none
    box-sizing border-box

  #edit-name
    border none
    border-bottom 1px solid lighten($link, 70%)
    font-family 'Merriweather', serif
    font-size 22px
    outline none
    background-color white
    width 100%
    padding 6px
    box-sizing border-box

  button
    border 1px solid lighten($link, 70%)
    font-family 'Merriweather', serif
    font-size 18px
    outline none
    background-color white
    width 20%
    left 40%
    position relative
    padding 6px
    box-sizing border-box
    cursor pointer

    &:hover
      background-color darken(white, 10%)
      border 1px solid lighten($link, 50%)
</style>

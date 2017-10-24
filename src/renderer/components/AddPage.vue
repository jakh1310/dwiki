<template>
  <div id="addPane">
    <h3>Adding {{ addType }}</h3>
    <br>
    <label for="name">TITLE</label>
    <input id="name" v-model="name"></input>
    <br><br>
    <label for="category" v-if="$route.params.type === 'article'">CATEGORY</label>
    <select name="Category" id="category" v-if="$route.params.type === 'article'" v-model="selected">
      <option value="none">No Category</option>
      <option v-for="category in categories" v-bind:key="category.name" v-bind:value="category.name">{{ category.name }}</option>
    </select>
    <label for="articles" v-if="$route.params.type === 'category'">ARTICLES<span class="right" id="clear" v-on:click="clearSelected()">CLEAR</span></label>
    <select name="Articles" id="articles" v-if="$route.params.type === 'category'" multiple v-model="selected">
      <option v-for="article in articles" v-bind:key="article.name" v-bind:value="article.name">{{ article.name }}</option>
    </select>
    <br><br>
    <button v-on:click="submit()">Okay</button>
  </div>
</template>

<script>
  export default {
    computed: {
      addType () {
        const type = this.$route.params.type
        return type.charAt(0).toUpperCase() + type.slice(1)
      },
      categories () {
        return this.$store.state.Data.categories
      },
      articles () {
        return this.$store.state.Data.articles
      }
    },
    methods: {
      submit () {
        if (this.name !== "") {
          const payload = { name: this.name }
          if (this.$route.params.type === 'category') {
            payload.articles = this.selected
            this.$store.commit('addCategory', payload)
            this.$router.push('/')
          } else {
            this.$store.commit('addArticle', { name: payload.name, content: "" })
            if (this.selected !== 'none') {
              payload.category = this.selected
              this.$store.commit('addCategoryArticle', payload)
            } 
            this.$router.push({ name: 'article', params: { name: payload.name }})
          }
        } else {
          console.error('Name not valid.')
        }
      },
      clearSelected () {
        this.selected = []
      }
    },
    data () {
      return {
        name: "",
        selected: []
      }
    }
  }
</script>

<style lang="stylus" scoped>
  $link = #0E6ABF
  $text = #1C1C1A
  $sans = 'Open Sans', sans

  h3
    font-family 'Merriweather', serif
    font-weight 400
    font-size 24px
    margin 10px

  #articles
    height 300px
    width 160px
    border none
    border-bottom 1px solid lighten($link, 70%)
    font-family 'Merriweather', serif
    font-size 16px
    outline none
    background-color white
    width 100%
    padding 6px
    box-sizing border-box

    option
      background-color none

  #name
    border none
    border-bottom 1px solid lighten($link, 70%)
    font-family 'Merriweather', serif
    font-size 20px
    outline none
    background-color white
    width 100%
    padding 6px
    box-sizing border-box

  label
    font-family 'Merriweather', serif
    font-size 10px
    display block

  #clear
    float right
    color $link

    &:hover
      cursor pointer
      text-decoration underline

  #category
    border none
    border-bottom 1px solid lighten($link, 70%)
    font-family 'Merriweather', serif
    font-size 16px
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

<template>
  <div id="temp">
    <input id="cat-name" v-model="name"></input>
    <hr>
    <div id="tab-container">
      <span class="tab" :class="isSelected('Articles')" v-on:click="setSelected('Articles')">Articles
      </span><span class="tab" :class="isSelected('Reorder')" v-on:click="setSelected('Reorder')">Reorder</span>
    </div>
    <div id="art-container">
      <div v-if="selected === 'Articles'">
        <div v-for="article in allArticles" class="article"
          :key="article.name" v-on:click="toggleArticle(article.name)">{{ article.name }}
          <span v-if="(articles.indexOf(article.name) !== -1) ? true : false" :style="{ 'float': 'right' }">✔</span>
        </div>
      </div>
    </div>
    <button v-on:click="submit()">Okay</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        articles: '',
        selected: 'Articles'
      }
    },
    mounted () {
      const cat = this.$store.getters.getCategory(this.$route.params.name)
      this.name = cat.name
      this.articles = cat.articles
    },
    methods: {
      isSelected (el) {
        return { selected: (el === this.selected) ? true : false }
      },
      setSelected (el) {
        this.selected = el
      },
      toggleArticle (name) {
        const index = this.articles.indexOf(name)
        if (index !== -1) {
          this.articles.splice(index, 1)
        } else {
          this.articles.push(name)
        }
      },
      submit () {
        const category = {
          name: this.name,
          articles: this.articles
        }

        // Check if category name is edited
        if (this.$route.params.name !== category.name) {
          if (!this.$store.getters.checkCategory(this.name)) {
            this.$store.commit('removeCategory', { name: this.$route.params.name })
            this.$store.commit('addCategory', category)
          } else {
            this.$store.commit('editCategory', { name: this.$route.params.name, articles: category.articles })
          }
        } else {
          this.$store.commit('editCategory', category)
        }
        this.$router.replace('/categories')
      }
    },
    computed: {
      allArticles () {
        return this.$store.state.Data.articles
      }
    }
  }
</script>

<style lang="stylus" scoped>
  $link = #0E6ABF
  $text = #1C1C1A

  #temp
    height 100%
    width 100%

  #cat-name
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

  .tab
    border-color rgba(0,0,0,0) // Prevents elements moving when border is changed
    border-width 0px 1px 0px 1px
    border-style solid
    box-sizing border-box
    padding 6px 12px
    font-family 'Open Sans', sans
    font-size 15px
    cursor pointer
    user-select none

  .selected
    background-image linear-gradient(to top, white 0%, rgba(255, 255, 255, 0) 80%) 
    border-image linear-gradient(to bottom, rgba(0, 0, 0, 0) 5%, lighten($link, 70%) 100%) 1 100%

  .article    
    border none
    border 1px solid lighten($link, 70%)
    font-family 'Merriweather', serif
    font-size 16px
    outline none
    background-color white
    display block
    padding 6px
    box-sizing border-box
    margin-top -1px
    cursor pointer

    &:first-child
      margin-top 0px

    &:hover
      background-color darken(white, 10%)

  .included
    background-color darken(white, 10%)

  #art-container
    background-color white
    box-sizing border-box
    border 1px solid lighten($link, 70%)
    height calc(100% - 124px)
    margin-top 5px
    margin-bottom 4px
    padding 6px
    box-sizing border-box
</style>

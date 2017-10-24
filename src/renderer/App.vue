<template>
  <div id="app">
    <div id="wrapper" :style="blurBackground">
      <div id="title-bar">
        <button v-on:click="$router.back()">Back</button>
        <button v-on:click="$router.forward()">Next</button>
        <button v-on:click="toggleSettings()">Settings</button>
      </div>
      <div id="pane">
        <h1 id="wiki-title" class="title">{{ wikiTitle }}</h1>
        <router-link to="/" class="side-link">Main page</router-link>
        <router-link to="/featured" class="side-link">Featured article</router-link>
        <router-link to="/articles" class="side-link">All Articles</router-link>
        <router-link to="/categories" class="side-link">All Categories</router-link>
        <router-link to="/add/article" class="side-link">Add Article</router-link>
      </div>
      <div id="content">
        <router-view></router-view>
      </div>
    </div>

    <!-- Settings modal -->
    <settings-modal v-show="settingsModal" :toggleSettings="toggleSettings"></settings-modal>
  </div>
</template>

<script>
  import SettingsModal from './components/SettingsModal'

  export default {
    name: 'dwiki',
    data () {
      return {
        settingsModal: false
      }
    },
    created () {
      //this.$store.commit('getAllDatabases')
      this.$store.commit('startDB', { name: 'Aurellon' })
    },
    computed: {
      wikiTitle () {
        return this.$store.state.Data.currentWiki
      },
      blurBackground () {
        if (this.settingsModal) {
          return { 'filter': 'blur(1px)' }
        }
      }
    },
    components: {
      SettingsModal
    },
    methods: {
      toggleSettings () {
        this.settingsModal = !this.settingsModal
      }
    }
  }
</script>

<style lang="stylus">
  $link = #0E6ABF
  $text = #1C1C1A

  body
    padding 0
    margin 0
    height 100vh
    width 100%

  #app, #wrapper
    height 100%
    width 100%

  #title-bar
    width 100vw
    height 30px
    background-color #ccccd6

  .title
    font-family 'Merriweather', serif
    font-variant small-caps
    font-size 26px
    font-weight 400
    text-align center
    top 20px
    margin 0
    padding-bottom 10px
    border-bottom 1px solid lighten($text, 60%)

  a
    font-family 'Open Sans', sans
    font-size 14px
    line-height 20px
    color $link
    display block
    text-decoration none

    &:first-of-type
      margin-top 4px

    &:hover
      text-decoration underline

  #pane
    width 240px
    height calc(100% - 30px)
    padding 20px
    float left
    box-sizing border-box
    border-width 0 1px 0 0
    border-style solid
    border-image linear-gradient(to bottom, rgba(0, 0, 0, 0) 1%, #71a7d6 20%, #71a7d6 100%) 1 100%
    background-image linear-gradient(to top, darken(#e3e3ea, 5%) 0%, #e3e3ea 10%, #e3e3ea 100%) 
    color #1c1c1a

  #content  
    width calc(100% - 240px - 40px)
    height calc(100% - 30px - 40px)
    padding 20px
    float right
    background-image linear-gradient(to top, darken(#eeeef3, 5%) 0%, #eeeef3 10%, #eeeef3 100%) 
    color #1c1c1a
    overflow-y auto
    overflow-x hidden
</style>

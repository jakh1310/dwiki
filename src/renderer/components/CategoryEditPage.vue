<template>
  <div>
    {{ category.name }}
  </div>
</template>

<script>
  export default {
    computed: {
      category () {
        return this.$store.getters.getCategory(this.$route.params.name)
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: require('@/components/MainPage')
    },
    {
      path: '/article/:name',
      name: 'article',
      component: require('@/components/WikiPage')
    },
    {
      path: '/featured',
      name: 'featured',
      component: require('@/components/FeaturedPage')
    },
    {
      path: '/add/:type',
      name: 'add-page',
      component: require('@/components/AddPage')
    },
    {
      path: '/articles',
      name: 'articles',
      component: require('@/components/ArticlePage')
    },
    {
      path: '/article/:name/edit',
      name: 'article-edit',
      component: require('@/components/EditPage')
    },
    {
      path: '/category/:name/edit',
      name: 'category-edit',
      component: require('@/components/CategoryEditPage')
    },
    {
      path: '/categories',
      name: 'categories',
      component: require('@/components/CategoryPage')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

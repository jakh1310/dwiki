import Store from 'electron-store'
import { remote } from 'electron'
import path from 'path'
import { wt } from '../../modules'
import marked from 'marked'

const appPath = remote.app.getPath('userData') + '\\wikis'

const state = {
  currentWiki: null,
  db: {},
  categories: {},
  articles: {}
}

const mutations = {
  startDB (state, payload) {
    initializeDB(state, payload)
    updateInformation(state)
  },
  addCategory (state, payload) {
    if (!state.db.has('categories.' + wt.formatTitle(payload.name))) {
      state.db.set('categories.' + wt.formatTitle(payload.name), payload)
    } else {
      console.error('Category not unique')
    }
    updateInformation(state)
  },
  addArticle (state, payload) {
    if (!state.db.has('articles.' + wt.formatTitle(payload.name))) {
      state.db.set('articles.' + wt.formatTitle(payload.name), payload)
    } else {
      console.error('Article not unique')
    }
    updateInformation(state)
  },
  removeCategory (state, payload) {
    state.db.delete('categories.' + wt.formatTitle(payload.name))
    updateInformation(state)
  },
  removeArticle (state, payload) {
    state.db.delete('articles.' + wt.formatTitle(payload.name))
    let categories = state.categories
    Object.keys(categories).forEach((key) => {
      categories[key].articles = categories[key].articles.filter((item) => {
        return !(item === payload.name)
      })
    })
    state.db.set('categories', categories)
    updateInformation(state)
  },
  addCategoryArticle (state, payload) {
    let articles = state.db.get('categories.' + wt.formatTitle(payload.category)).articles
    if (!articles.includes(payload.name)) {
      articles.push(payload.name)
      state.db.set('categories.' + wt.formatTitle(payload.category) + '.articles', articles)
      updateInformation(state)
    } else {
      console.error('Article already listed in category')
    }
  },
  removeCategoryArticle (state, payload) {
    let articles = state.db.get('categories.' + wt.formatTitle(payload.category)).articles
    articles = articles.filter((item) => {
      return !payload.articles.includes(item)
    })
    state.db.set('categories.' + wt.formatTitle(payload.category) + '.articles', articles)
    updateInformation(state)
  },
  editArticle (state, payload) {
    state.db.set('articles.' + wt.formatTitle(payload.name), payload)
  },
  editCategoryArticle (state, payload) {
    let categories = state.db.get('categories')
    Object.keys(categories).forEach((key) => {
      let index = categories[key].articles.indexOf(payload.oldName)
      if (index !== -1) {
        categories[key].articles[index] = payload.newName
      }
    })
    state.db.set('categories', categories)
    updateInformation(state)
  },
  editCategory (state, payload) {
    state.db.set('categories.' + wt.formatTitle(payload.name), payload)
    updateInformation(state)
  }
}

const actions = {

}

const getters = {
  // Get a specific category's content
  getCategory: (state, getters) => (name) => {
    return state.db.get('categories.' + wt.formatTitle(name))
  },

  // Get a specific article's content
  getArticle: (state, getters) => (name) => {
    const article = state.db.get('articles.' + wt.formatTitle(name))

    // article.content = marked(article.content)
    article.raw = article.content
    article.content = wt.process(article.content)
    return article
  },
  
  // Check if an article exists in the wiki 
  checkArticle: (state, getters) => (name) => {
    return state.db.has('articles.' + wt.formatTitle(name))
  },

  // Check if a category exists
  checkCategory: (state, getters) => (name) => {
    return state.db.has('categories.' + wt.formatTitle(name))
  }
}

// Initialize a database file with the specified name and load/create data arrays
function initializeDB(state, payload) {
  state.db = new Store({ name: payload.name })
  state.db.set('wikiName', payload.name)
  state.currentWiki = payload.name

  if (state.db.get('categories') === undefined) {
    state.db.set('categories', {})
  } 

  if (state.db.get('articles') === undefined) {
    state.db.set('articles', {})
  } 
}

// Grab new information to pass to components
function updateInformation(state) {
  state.categories = state.db.get('categories')
  state.articles = state.db.get('articles')
}

export default {
  state,
  mutations,
  actions,
  getters
}
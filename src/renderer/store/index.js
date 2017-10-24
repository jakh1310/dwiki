import Vue from 'vue'
import Vuex from 'vuex'
import { remote } from 'electron'
import path from 'path'
import fs from 'fs'
import modules from './modules'

const appPath = remote.app.getPath('userData') + '\\wikis'

Vue.use(Vuex)

export default new Vuex.Store({
  /*state: {
    databases: []
  },
  mutations: {
    getAllDatabases (state) {
      alert('Getting all databases')
      state.databases = fs.readdirSync(appPath)
      console.log(state.databases)
    },
  },*/
  modules
})

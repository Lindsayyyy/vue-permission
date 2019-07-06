import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    asideRouters: []
  },
  mutations: {
    setAsideRouters (state, msg) {
      state.asideRouters = msg
    }
  }
})

export default store

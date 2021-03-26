import Vue from 'vue'
import Vuex from 'vuex'
import todolist from './todolist'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      todolist
    },

    strict: process.env.DEV
  })

  // if (process.env.DEV && module.hot) {
  //   module.hot.accept(['./todolist'], () => {
  //     const newTodolist = require('./todolist').default
  //     Store.hotUpdate({ modules: { todolist: newTodolist } })
  //   })
  // }

  return Store
}
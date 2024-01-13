import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

Vue.use(Vuex)

export default new Vuex.Store({
      modules: {
        // 在这里定义你的模块
        tab
      }
})
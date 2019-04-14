import Vue from 'vue'
import Vuex from 'vuex'
import baseOffer from './modules/base_offer'
import order from './modules/order'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    baseOffer,
    order,
  },
  getters
})

export default store

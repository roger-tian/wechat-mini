import Vue from 'vue'
import App from './App'
import 'mpvue-weui/src/style/weui.css'
import request from './utils/request'

Vue.config.productionTip = false
Vue.prototype.$http = request
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

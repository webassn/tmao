import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './assets/css/index.css'
import 'swiper/dist/css/swiper.css' 
//  px 转 rem
import 'lib-flexible'

import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require("./assets/images/loading.gif")
})
global.storage = window.localStorage
// mint-ui 组件 loading加载组件
import Mint from 'mint-ui'
Vue.use(Mint)
import 'mint-ui/lib/style.css'

import Axios from 'axios'
Vue.prototype.$axios = Axios;
// request 请求拦截器
Axios.interceptors.request.use(function (req) {
  // 显示loading
  Mint.Indicator.open('加载...');
  return req;
})
// response 响应拦截器
Axios.interceptors.response.use(function (res) {
  // 隐藏loading
  Mint.Indicator.close();
  return res;
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

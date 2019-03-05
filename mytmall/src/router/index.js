import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import cart from '@/pages/cart'
import category from '@/pages/category'
import personal from '@/pages/personal'
import product from '@/pages/product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/category',
      name: 'category',
      component: category
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    // 详情页 路由
    {
      path:'/product/:id/:imgurl',
      name:'product',
      component:product
    },
    {
      path:'*',
      redirect:'home'
    }
  ]
})

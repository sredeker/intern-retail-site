import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Shirt1 from '@/components/Shirt1'
import Shirt2 from '@/components/Shirt2'
import Shirt3 from '@/components/Shirt3'
import Cart from '@/components/Cart'
import Categories from '@/components/Categories'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/shirt1',
      name: 'Shirt1',
      component: Shirt1
    },
    {
      path: '/shirt2',
      name: 'Shirt2',
      component: Shirt2
    },
    {
      path: '/shirt3',
      name: 'Shirt3',
      component: Shirt3
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories
    }
  ]
})

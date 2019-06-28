import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Cart from '@/components/Cart'
import Categories from '@/components/Categories'
import ProductManagement from '@/components/ProductManagement'
import ProductCategory from '@/components/ProductCategory'
import Product from '@/components/Product'
import Delete from '@/components/Delete'

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
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories
    },
    {
      path: '/product-management',
      name: 'ProductManagement',
      component: ProductManagement
    },
    {
      path: '/categories/:id',
      name: 'ProductCategory',
      component: ProductCategory
    },
    {
      path: '/categories/:category/:id',
      name: 'Product',
      component: Product
    },
    {
      path: '/delete',
      name: 'Delete',
      component: Delete
    }
  ]
})

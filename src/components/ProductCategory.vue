<template>
  <div class="posts">
    <header>
      <ul>
        <li><router-link v-bind:to="{ name: 'Home' }" class="">Home</router-link></li>
        <li><router-link v-bind:to="{ name: 'Cart' }" class="">Cart</router-link></li>
        <li><router-link v-bind:to="{ name: 'Categories' }" class="">Categories</router-link></li>
        <li><router-link v-bind:to="{ name: 'ProductManagement' }" class="">Product Management</router-link></li>
      </ul>
    </header>
    <h1>{{ this.$route.params.id }}</h1>
    <div v-if="products.length > 0" class="table-wrap">
      <table>
        <tr>
          <td>Product</td>
        </tr>
        <tr v-for="product in products" :key="product">
          <td v-if="'Shirts' == product.category"><router-link v-bind:to="'/categories/' + product.category + '/' + product.title" class="">{{ product.title }}</router-link></td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no products in this category<br /><br />
    </div>
  </div>
</template>
<script>
import ProductsService from '@/services/ProductsService'
export default {
  name: 'products',
  data () {
    return {
      products: []
    }
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    async getProducts () {
      const response = await ProductsService.fetchProducts()
      this.products = response.data.products
      console.log(response.data)
    }
  }
}
</script>
<style>
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 250px;
  border: none;
  cursor: pointer;
}
</style>

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
    <h1>{{ currentCategory }}</h1>
    <div v-if="products.length > 0" class="table-wrap">
      <table>
        <tr>
          <td>Product</td>
        </tr>
        <tr v-for="product in products" :key="product">
          <td><router-link v-bind:to="'/categories/' + currentCategoryURL + '/' + product.url" class="">{{ product.title }}</router-link></td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no products in this category<br /><br />
    </div>
  </div>
</template>
<script>
import CategoriesService from '@/services/CategoriesService'
import ProductsService from '@/services/ProductsService'
export default {
  name: 'products',
  data () {
    return {
      products: [],
      currentCategoryURL: this.$route.params.id,
      categories: [],
      currCategory: ''
    }
  },
  mounted () {
    this.getCategories()
    this.getProducts()
  },
  methods: {
    async getCategories () {
      const response = await CategoriesService.fetchCategories()
      this.categories = response.data.categories
      console.log(response.data)
    },
    async getProducts () {
      const response = await ProductsService.fetchProducts()
      var i
      for (i = 0; i < response.data.products.length; i++) {
        if (response.data.products[i].category.replace(/\s+/g, '-').toLowerCase() === this.currentCategoryURL) {
          this.products.push(response.data.products[i])
        }
      }
      console.log(response.data)
    }
  },
  computed: {
    currentCategory () {
      var i
      for (i = 0; i < this.categories.length; i++) {
        if (this.categories[i].url === this.currentCategoryURL) {
          return this.categories[i].title
        }
      }
      return 'N/A'
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

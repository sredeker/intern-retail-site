<template>
  <div class="posts">
    <h1>{{ currentCategory }}</h1>
    <div v-if="currProducts.length > 0" class="table-wrap">
      <table>
        <tr>
          <td>Product</td>
        </tr>
        <tr v-for="product in currProducts" :key="product">
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
      currProducts: [],
      categories: []
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
      this.products = response.data.products
      console.log(response.data)
      var i
      this.currProducts = []
      for (i = 0; i < this.products.length; i++) {
        if (this.products[i].category.replace(/\s+/g, '-').toLowerCase() === this.currentCategoryURL) {
          this.currProducts.push(this.products[i])
        }
      }
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
    },
    currentCategoryURL () {
      return this.$route.params.id
    }
  },
  watch: {
    currentCategoryURL: function () {
      var i
      this.currProducts = []
      for (i = 0; i < this.products.length; i++) {
        if (this.products[i].category.replace(/\s+/g, '-').toLowerCase() === this.currentCategoryURL) {
          this.currProducts.push(this.products[i])
        }
      }
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

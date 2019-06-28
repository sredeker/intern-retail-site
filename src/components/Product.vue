<template>
  <div class="posts">
    <header>
      <ul>
        <li><router-link v-bind:to="{ name: 'Home' }" class="">Home</router-link></li>
        <li><router-link v-bind:to="{ name: 'Cart' }" class="">Cart</router-link></li>
      </ul>
    </header>
    <h1>{{ currentProduct }}</h1>
    <h2>Price:</h2>
    <img src="../../build/logo.png">
    <div>
      <button class="app_post_btn" @click="addPost">Add to cart</button>
    </div>
    <h2>Rating: {{ calculateRating }}</h2>
  </div>
</template>
<script>
import PostsService from '@/services/PostsService'
import ProductsService from '@/services/ProductsService'
export default {
  name: 'Product',
  data () {
    return {
      title: '',
      description: '',
      currentProduct: this.$route.params.id,
      products: [],
      prod: ''
    }
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    async addPost () {
      await PostsService.addPost({
        title: 'Shirt 1',
        description: 1
      })
    },
    async getProducts () {
      const response = await ProductsService.fetchProducts()
      var i
      for (i = 0; i < response.data.products.length; i++) {
        if (response.data.products[i].category === this.currentCategory) {
          this.products.push(response.data.products[i])
        }
      }
      console.log(response.data)
    }
  },
  computed: {
    calculateRating () {
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

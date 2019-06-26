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
    <h1>Category</h1>
    <div>
      <button class="app_post_btn" @click="addPost">Add to cart</button>
    </div>
    <h2>Rating: {{ calculateRating }}</h2>
  </div>
</template>
<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'NewPost',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    async addPost () {
      await PostsService.addPost({
        title: 'Shirt 1',
        description: 1
      })
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

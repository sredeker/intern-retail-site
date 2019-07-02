<template>
  <header>
    <div class="logo">
      <img src="../assets/logo.png">
    </div>
    <nav>
      <router-link v-bind:to="{ name: 'Home' }" class="">Home</router-link>
      | <router-link v-bind:to="{ name: 'Cart' }" class="">Cart</router-link>
      | <div class="dropdown">
          <button class="dropbtn"><router-link v-bind:to="{ name: 'Categories' }" class="">Categories</router-link></button>
            <div v-if="categories.length > 0" class="dropdown-content">
              <router-link v-for="category in categories" :key="category" v-bind:to="'/categories/' + category.url" class="">{{ category.title }}</router-link>
            </div>
          </div>
      | <router-link v-bind:to="{ name: 'ProductManagement' }" class="">Product Management</router-link>
    </nav>
  </header>
</template>

<script>
import CategoriesService from '@/services/CategoriesService'
export default {
  name: 'GlobalHeader',
  data () {
    return {
      categories: []
    }
  },
  mounted () {
    this.getCategories()
  },
  methods: {
    async getCategories () {
      const response = await CategoriesService.fetchCategories()
      this.categories = response.data.categories
      console.log(response.data)
    }
  }
}
</script>

<style lang="scss" scoped>
header {
 @include clearfix;
}

.logo {
  float: left;
}

/* Dropdown Button */
.dropbtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #ddd;}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {display: block;}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {background-color: #3e8e41;}
</style>

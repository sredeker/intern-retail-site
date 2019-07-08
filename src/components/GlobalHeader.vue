<template>
  <header>
    <div id="global-header">
      <div class="logo">
        <img @click="goToHome()" src="../assets/nf-logo.png" style="width:128px;height:128px;">
      </div>
      <nav>
        <div class="headerlinks">
          <router-link v-bind:to="{ name: 'Home' }" class="">HOME</router-link>
          | <router-link v-bind:to="{ name: 'Cart' }" class="">CART</router-link>
          | <div class="dropdown">
              <button class="dropbtn"><router-link v-bind:to="{ name: 'Categories' }" class="">CATEGORIES</router-link></button>
                <div v-if="categories.length > 0" class="dropdown-content">
                  <router-link v-for="category in categories" :key="category" v-bind:to="'/categories/' + category.url" class="" @click="reloadPage()">{{ category.title }}</router-link>
                </div>
            </div>
          | <router-link v-bind:to="{ name: 'ProductManagement' }" class="">PRODUCT MANAGEMENT</router-link>
        </div>
        <div class="search-container" role="search">
          <form action="/action_page.php">
            <input type="text" placeholder="Search">
            <button type="submit"><i class="fa fa-search"></i></button>
          </form>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import CategoriesService from '@/services/CategoriesService'
export default {
  name: 'GlobalHeader',
  data () {
    return {
      categories: [],
      url: this.$route.params.id
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
    },
    reloadPage (url) {
      this.url = url
    },
    goToHome () {
      this.$router.push({ name: 'Home' })
    }
  },
  watch: {
    url: function () {
      console.log(this.url)
      this.$router.go()
    }
  }
}
</script>

<style lang="scss" scoped>
header {
 @include clearfix;
}

.global-header {
  font-family: Helvetica;
  font-style: bold;
}

.logo {
  float: left;
}

.headerlinks {
  float: left;
}

.headerlinks a:hover {color: #ff0000}

/* Dropdown Button */
.dropbtn {
  /*background-color: #4CAF50; */
  color: white;
  padding: 16px;
  font-size: 18px;
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
  background-color: #ffffff;
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

.global-header input[type=text] {
  float: right;
  padding: 6px;
  border: none;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
}

.search-container button {
  float: right;
  padding: 6px 10px;
  margin-top: 8px;
  margin-right: 16px;
  background: #ddd;
  font-size: 17px;
  border: none;
  cursor: pointer;
}

.search-container button:hover {
  background: #ccc;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #ddd;}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {display: block;}

/* Change the background color of the dropdown button when the dropdown content is shown */
/*.dropdown:hover .dropbtn {background-color: #3e8e41;} */
</style>

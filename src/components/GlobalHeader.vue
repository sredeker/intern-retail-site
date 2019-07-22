<template>
  <header id="global-header">

      <!-- Utility Nav -->
      <div class="utility-nav">
        <div class="headerlinks">
          <router-link v-bind:to="{ name: 'Home' }" class="">HOME</router-link>
          | <router-link v-bind:to="{ name: 'Cart' }" class="">CART</router-link>
          | <router-link v-bind:to="{ name: 'ProductManagement' }" class="">PRODUCT MANAGEMENT</router-link>
        </div>
        <div class="search-container" role="search">
          <form action="/action_page.php">
            <input type="text" placeholder="Search">
            <button type="submit"><i class="fa fa-search"></i></button>
          </form>
        </div>
      </div>

      <!-- Utility Nav -->
      <div class="logo">
        <img @click="goToHome()" src="../assets/tnf-logo.svg">
      </div>

      <!-- Main Nav -->
      <nav class="main-nav" v-if="categories.length > 0">
        <ul>
          <li v-for="category in categories" :key="category">
            <router-link v-bind:to="'/categories/' + category.url" class="" @click="reloadPage()">{{ category.title }}</router-link>
          </li>
        </ul>
      </nav>

      <!-- PromoBar -->
      <div class="promobar">
        <div class="message">Free Shipping & Free Returns</div>
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
$logoWidth: 113px;
$logoHeight: 55px;
$promobarHeight: 35px !default;

#global-header {
 @include clearfix;
 height: 100px;
 position: relative;
}

.global-header {
  font-family: Helvetica;
  font-style: bold;
}

.logo {
  position: absolute;
  bottom:$promobarHeight;
  height: $logoHeight;
  width: $logoWidth;
  padding-bottom: column-gutter()/2;

  img {
      width:100%;
      height: 100%;
  }
}

.main-nav {
  float:left;
  position: absolute;
  bottom: $promobarHeight;
  left: $logoWidth;
  padding: 0 column-gutter() column-gutter()/2;

  ul {
    list-style: none;
  }

  li {
   display: inline-block;
   float: left;
   padding: 0 column-gutter()/2;
  }

  a {
    color: $black;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    font-family: get-font('NeueHelveticaVFDPCond');
    text-decoration: none;
  }
}

.utility-nav {
  float:right;
}

.headerlinks {
  float: left;
}

.headerlinks a:hover {color: #ff0000}

.promobar {
    @include clearfix;
    position: absolute;
    bottom: 0;
    width:100%;
    background: $black;
    color: $white;
    text-align: center;
    height: $promobarHeight;
    text-transform:uppercase;
    font-size:11px;
    font-weight: bold;

    .message {
      margin-top:10px;
    }
}

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

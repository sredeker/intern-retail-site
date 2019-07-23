
<template>
  <div class="posts">
    <header>
      <ul>
        <li><router-link v-bind:to="{ name: 'Delete' }" class="">Delete</router-link></li>
        <li><router-link v-bind:to="{ name: 'EditProduct' }" class="">Edit Product</router-link></li>
    </ul>
    </header>
    <h1>Add Category</h1>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="TITLE" v-model="title">
        </div>
        <div>
          <button class="app_post_btn" @click="addCategory">Add</button>
        </div>
      </div>
    <div v-if="categories.length > 0" class="table-wrap">
      <h1>Add Product to Category</h1>
      Choose a Category
      <select v-model="category">
        <option disabled value="">Please select one</option>
        <option v-for="cat in categories" :key="cat">{{ cat.title }}</option>
      </select>
      <span>Selected: {{ category }}</span>
      <div class="form">
        <div>
          <input type="text" name="product" placeholder="PRODUCT" v-model="product">
        </div>
        <div>
          <input type="text" name="price" placeholder="PRICE" v-model="price">
        </div>
        <div>
          <input type="text" name="img" placeholder="IMAGE" v-model="img">
        </div>
        <div id='color-checkbox'>
          <input type="checkbox" id="red" value="Red" v-model="colors">
          <label for="jack">Red</label>
          <input type="checkbox" id="blue" value="Blue" v-model="colors">
          <label for="john">Blue</label>
          <input type="checkbox" id="black" value="Black" v-model="colors">
          <label for="mike">Black</label>
          <br>
          <span>Checked colors: {{ colors }}</span>
        </div>
        <div>
          <input type="text" name="summary" placeholder="SUMMARY" v-model="summary">
        </div>
        <div v-for="i in colors.length" :key="i">
          {{ colors[i - 1] }} Inventory
          <br>
          <input type="text" name="inventory" placeholder="INVENTORY" v-model="stock[i - 1]">
          <br>
        </div>
        <div>
          <button class="app_post_btn" @click="addProduct">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CategoriesService from '@/services/CategoriesService'
import ProductsService from '@/services/ProductsService'
export default {
  name: 'ProductManagement',
  data () {
    return {
      title: '',
      product: '',
      price: '',
      img: '',
      colors: [],
      summary: '',
      stock: [],
      category: '',
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
    },
    async addCategory () {
      await CategoriesService.addCategory({
        title: this.title,
        url: this.title.replace(/\s+/g, '-').toLowerCase()
      })
      this.$router.push({ name: 'Categories' })
    },
    async addProduct () {
      var colorsStock = [this.colors.length]
      var i
      for (i = 0; i < this.colors.length; i++) {
        colorsStock[i] = {
          'color': this.colors[i],
          'inventory': this.stock[i]
        }
      }
      await ProductsService.addProduct({
        title: this.product,
        category: this.category,
        url: this.product.replace(/\s+/g, '-').toLowerCase(),
        price: this.price,
        img: this.img,
        colors: colorsStock,
        summary: this.summary,
        stock: this.stock
      })
      this.$router.push({ name: 'Categories' })
    }
  },
  watch: {
    colors: function () {
      this.stock = []
      this.stock = [this.colors.length]
    }
  }
}
</script>
<style type="text/css">
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>

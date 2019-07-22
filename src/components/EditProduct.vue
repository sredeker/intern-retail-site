<template>
  <div class="posts">
    <h1>Edit a Product</h1>
      Choose a Product
      <select v-model="product">
        <option disabled value="">Please select one</option>
        <option v-for="prod in products" :key="prod">{{ prod.title }}</option>
      </select>
      <span>Selected: {{ product }}</span>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="TITLE" v-model="title">
        </div>
        <div>
          <input type="text" name="price" placeholder="PRICE" v-model="price">
        </div>
        <div>
          <input type="text" name="img" placeholder="IMAGE" v-model="img">
        </div>
        <select v-model="sizes" multiple>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
        <br>
        <span>Selected: {{ sizes }}</span>
        <br>
        <select v-model="colors" multiple>
          <option>Red</option>
          <option>Blue</option>
          <option>Black</option>
        </select>
        <br>
        <span>Selected: {{ colors }}</span>
        <div>
          <input type="text" name="summary" placeholder="SUMMARY" v-model="summary">
        </div>
        <div>
          <button class="app_post_btn" @click="updateProduct">Update</button>
        </div>
      </div>
  </div>
</template>
<script>
import ProductsService from '@/services/ProductsService'
export default {
  name: 'Edit',
  data () {
    return {
      title: '',
      price: '',
      img: '',
      sizes: [],
      colors: [],
      summary: '',
      product: '',
      products: [],
      id: '',
      category: ''
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
    },
    async updateProduct () {
      await ProductsService.updateProduct({
        id: this.id,
        title: this.title,
        category: this.category,
        url: this.title.replace(/\s+/g, '-').toLowerCase(),
        price: this.price,
        img: this.img,
        sizes: this.sizes.toLowerCase().split(' '),
        colors: this.colors.toLowerCase().split(' '),
        summary: this.summary
      })
      this.$router.push({ name: 'EditProduct' })
    }
  },
  watch: {
    product: function () {
      var i
      for (i = 0; i < this.products.length; i++) {
        if (this.products[i].title === this.product) {
          this.category = this.products[i].category
          this.id = this.products[i]._id
        }
      }
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

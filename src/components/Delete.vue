
<template>
  <div class="posts">
      <table>
        <tr>
          <td>Category</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="category in categories" :key="category">
          <td>{{ category.title }}</td>
          <td align="center">
            <a href="#" @click="deleteCategory(category._id)">Delete</a>
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td>Product</td>
          <td width="550">Category</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="product in products" :key="product">
          <td>{{ product.title }}</td>
          <td>{{ product.category }}</td>
          <td align="center">
            <a href="#" @click="deleteProduct(product._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
</template>

<script>
import CategoriesService from '@/services/CategoriesService'
import ProductsService from '@/services/ProductsService'
export default {
  name: 'Delete',
  data () {
    return {
      categories: [],
      products: []
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
    async deleteCategory (id) {
      await CategoriesService.deleteCategory(id)
      this.getCategories()
      this.$router.push({ name: 'Delete' })
    },
    async getProducts () {
      const response = await ProductsService.fetchProducts()
      this.products = response.data.products
      console.log(response.data)
    },
    async deleteProduct (id) {
      await ProductsService.deleteProduct(id)
      this.getProducts()
      this.$router.push({ name: 'Delete' })
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
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>

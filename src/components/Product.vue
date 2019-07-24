<template>
  <div class="posts">
    <h1>{{ currentProduct }}</h1>
    <h2>Price: ${{ price.toFixed(2) }}</h2>
    <img :src="img">
    <br>
    Summary: {{ summary }}
    <h4>
    Choose a Color
      <select v-model="color">
        <option disabled value="">Please select one</option>
        <option v-for="col in colors_filtered" :key="col" :value="col.color">{{ col.color }} - {{ col.inventory }} in stock!</option>
      </select>
      <span>Selected: {{ color }}</span>
    </h4>
    <div>
      <button class="app_post_btn" :disabled="!color" @click="addPost">Add to cart</button>
    </div>
    <h3>Rating: {{ calculateRating }}</h3>
    <h2>Add a Review:</h2>
      <select v-model="rating">
        <option disabled value="">Please select one</option>
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <span>Selected: {{ rating }}</span>
      <div class="form">
        <div>
          <input type="text" name="review" placeholder="WRITE REVIEW" v-model="review">
        </div>
        <div>
          <button class="app_post_btn" :disabled="!rating" @click="addReview">Add</button>
        </div>
      </div>
    <div v-if="reviews.length > 0" class="table-wrap">
    <h2>Reviews:</h2>
      <table>
        <tr>
          <td>Rating</td>
          <td width="550">Review</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="review in reviews" :key="review">
          <td>{{ review.rating }}</td>
          <td>{{ review.review }}</td>
          <td align="center">
            <a href="#" @click="deleteReview(review._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import PostsService from '@/services/PostsService'
import ProductsService from '@/services/ProductsService'
import ReviewsService from '@/services/ReviewsService'
export default {
  name: 'Product',
  data () {
    return {
      title: '',
      description: '',
      currentProductURL: this.$route.params.id,
      currentProduct: '',
      price: '',
      img: '',
      products: [],
      rating: '',
      review: '',
      reviews: [],
      color: '',
      colors: [],
      summary: ''
    }
  },
  mounted () {
    this.getProduct()
    this.getReviews()
  },
  methods: {
    async addPost () {
      await PostsService.addPost({
        title: this.currentProduct + ' - ' + this.color,
        description: this.price
      })
    },
    async getProduct () {
      const response = await ProductsService.fetchProducts()
      this.products = response.data.products
      var i
      for (i = 0; i < this.products.length; i++) {
        if (this.products[i].url === this.currentProductURL) {
          this.currentProduct = this.products[i].title
          this.price = this.products[i].price
          this.img = this.products[i].img
          this.colors = this.products[i].colors
          this.summary = this.products[i].summary
          break
        }
      }
      console.log(response.data)
    },
    async addReview () {
      await ReviewsService.addReview({
        product: this.currentProduct,
        rating: this.rating,
        review: this.review
      })
      this.getReviews()
      this.$router.push({ name: 'Product' })
    },
    async getReviews () {
      this.reviews = []
      const response = await ReviewsService.fetchReviews()
      var i
      for (i = 0; i < response.data.reviews.length; i++) {
        if (response.data.reviews[i].product === this.currentProduct) {
          this.reviews.push(response.data.reviews[i])
        }
      }
      console.log(response.data)
    },
    async deleteReview (id) {
      await ReviewsService.deleteReview(id)
      this.getReviews()
      this.$router.push({ name: 'Product' })
    }
  },
  computed: {
    calculateRating () {
      var i
      var total = 0
      for (i = 0; i < this.reviews.length; i++) {
        total += this.reviews[i].rating
      }
      if (i > 0) {
        return total / i
      }
      return 'N/A'
    },
    colors_filtered () {
      var array = []
      var i
      for (i = 0; i < this.colors.length; i++) {
        if (this.colors[i].inventory > 0) {
          array.push(this.colors[i])
        }
      }
      return array
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

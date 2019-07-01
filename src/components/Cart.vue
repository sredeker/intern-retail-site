
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
    <h1>Cart</h1>
    <div v-if="posts.length > 0" class="table-wrap">
      <table>
        <tr>
          <td>Title</td>
          <td width="550">Description</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="post in posts" :key="post">
          <td>{{ post.title }}</td>
          <td>${{ post.description }}.00</td>
          <td align="center">
            <a href="#" @click="deletePost(post._id)">Delete</a>
          </td>
        </tr>
      </table>
      Total price: ${{ totalPrice.toFixed(2) }}
    </div>
    <div v-else>
      There are no items in the cart <br /><br />
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.posts = response.data.posts
      console.log(response.data)
    },
    async deletePost (id) {
      await PostsService.deletePost(id)
      this.getPosts()
      this.$router.push({ name: 'Cart' })
    }
  },
  computed: {
    totalPrice () {
      var total = 0
      var i
      for (i = 0; i < this.posts.length; i++) {
        total += this.posts[i].description
      }
      return total
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

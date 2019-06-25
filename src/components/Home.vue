
<template>
  <div class="posts">
    <header>
      <ul>
        <li><router-link v-bind:to="{ name: 'Home' }" class="">Home</router-link></li>
        <li><router-link v-bind:to="{ name: 'Cart' }" class="">Cart</router-link></li>
        <li><router-link v-bind:to="{ name: 'Categories' }" class="">Categories</router-link></li>
    </ul>
    </header>
    <h1>Shirts</h1>
    <div>
      <router-link v-bind:to="{ name: 'Shirt1' }" class="">Shirt 1</router-link>
    </div>
    <div>
      <router-link v-bind:to="{ name: 'Shirt2' }" class="">Shirt 2</router-link>
    </div>
    <div>
      <router-link v-bind:to="{ name: 'Shirt3' }" class="">Shirt 3</router-link>
    </div>
  </div>
</template>
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

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

// Start Express Server for API
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Fetch all posts
app.get('/posts', (req, res) => {
  Post.find({}, 'title description', function (error, posts) {
    if (error) { console.error(error); }
    res.send({
      posts: posts
    })
  }).sort({_id:-1})
})

// Fetch all categories
app.get('/categories', (req, res) => {
  Category.find({}, 'title url', function (error, categories) {
    if (error) { console.error(error); }
    res.send({
      categories: categories
    })
  }).sort({_id:-1})
})

// Fetch all products
app.get('/products', (req, res) => {
  Product.find({}, 'title category url price', function (error, products) {
    if (error) { console.error(error); }
    res.send({
      products: products
    })
  }).sort({_id:-1})
})

// Fetch all reviews
app.get('/reviews', (req, res) => {
  Review.find({}, 'product rating review', function (error, reviews) {
    if (error) { console.error(error); }
    res.send({
      reviews: reviews
    })
  }).sort({_id:-1})
})

app.listen(process.env.PORT || 8081)

mongoose.connect("mongodb+srv://mevnAppUser:Sapient2019@mevn-intern-app-k67yb.mongodb.net/test?retryWrites=true&w=majority");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

var Post = require("./models/post");

// Add new post
app.post('/posts', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  var new_post = new Post({
    title: title,
    description: description
  })

  new_post.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

// Fetch single post
app.get('/post/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'title description', function (error, post) {
    if (error) { console.error(error); }
    res.send(post)
  })
})

// Update a post
app.put('/posts/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'title description', function (error, post) {
    if (error) { console.error(error); }

    post.title = req.body.title
    post.description = req.body.description
    post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a post
app.delete('/posts/:id', (req, res) => {
  var db = req.db;
  Post.remove({
    _id: req.params.id
  }, function(err, post){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

var Category = require("./models/category");

// Add new category
app.post('/categories', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var url = req.body.url;
  var new_category = new Category({
    title: title,
    url: url
  })

  new_category.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Category saved successfully!'
    })
  })
})

// Fetch single category
app.get('/category/:id', (req, res) => {
  var db = req.db;
  Post.findById(req.params.id, 'title url', function (error, post) {
    if (error) { console.error(error); }
    res.send(category)
  })
})

// Delete a category
app.delete('/categories/:id', (req, res) => {
  var db = req.db;
  Category.remove({
    _id: req.params.id
  }, function(err, post){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

var Product = require("./models/product");

// Add new product
app.post('/products', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var category = req.body.category;
  var url = req.body.url;
  var price = req.body.price;
  var new_product = new Product({
    title: title,
    category: category,
    url: url,
    price: price
  })

  new_product.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Product saved successfully!'
    })
  })
})

// Fetch single product
app.get('/product/:id', (req, res) => {
  var db = req.db;
  Product.findById(req.params.id, 'title category url price', function (error, post) {
    if (error) { console.error(error); }
    res.send(product)
  })
})

// Update a product
app.put('/products/:id', (req, res) => {
  var db = req.db;
  Product.findById(req.params.id, 'title category url price', function (error, post) {
    if (error) { console.error(error); }

    post.title = req.body.title
    post.category = req.body.category
    post.url = req.body.url
    post.price = req.body.price
    post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a product
app.delete('/products/:id', (req, res) => {
  var db = req.db;
  Product.remove({
    _id: req.params.id
  }, function(err, post){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

var Review = require("./models/review");

// Add new review
app.post('/reviews', (req, res) => {
  var db = req.db;
  var product = req.body.product;
  var rating = req.body.rating;
  var review = req.body.review;
  var new_review = new Review({
    product: product,
    rating: rating,
    review: review
  })

  new_review.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Review saved successfully!'
    })
  })
})

// Fetch single review
app.get('/review/:id', (req, res) => {
  var db = req.db;
  Review.findById(req.params.id, 'product rating review', function (error, post) {
    if (error) { console.error(error); }
    res.send(review)
  })
})

// Update a review
app.put('/reviews/:id', (req, res) => {
  var db = req.db;
  Review.findById(req.params.id, 'product rating review', function (error, post) {
    if (error) { console.error(error); }

    post.product = req.body.product
    post.rating = req.body.rating
    post.review = req.body.review
    post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a review
app.delete('/reviews/:id', (req, res) => {
  var db = req.db;
  Review.remove({
    _id: req.params.id
  }, function(err, post){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

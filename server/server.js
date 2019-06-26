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
  Category.find({}, 'title', function (error, categories) {
    if (error) { console.error(error); }
    res.send({
      categories: categories
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
  var new_category = new Category({
    title: title
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
  Post.findById(req.params.id, 'title', function (error, post) {
    if (error) { console.error(error); }
    res.send(category)
  })
})

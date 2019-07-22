var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  description: Number,
  size: String,
  color: String
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;

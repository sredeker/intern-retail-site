var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  title: String,
  category: String,
  url: String,
  price: Number,
  img: String
});

var Product = mongoose.model("Product", ProductSchema);
module.exports = Product;

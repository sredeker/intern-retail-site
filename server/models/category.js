var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  title: String,
  url: String
});

var Category = mongoose.model("Category", CategorySchema);
module.exports = Category;

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  product: String,
  rating: Number,
  review: String
});

var Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;

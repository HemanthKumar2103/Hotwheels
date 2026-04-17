const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  images: [String],   // ✅ MUST be array
  description: String
});

module.exports = mongoose.model("Product", productSchema);
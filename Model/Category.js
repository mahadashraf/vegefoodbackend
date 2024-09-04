const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
  Product_name: { type: String, required: true },
  Product_price: { type: Number, required: true },
  Sale_price: { type: Number,  required:true},
  Sale_Percent: { type: String, required:true },
  Product_category: { type: String, required:true },
  imageUrl: { type: String, required: true }
});
const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;

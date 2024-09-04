
const mongoose = require('mongoose');


const UploadSchema = new mongoose.Schema({
  ProductName: { type: String, required: true },
  ProductPrice: { type: Number, required: true },
  Product_category: { type: String, required:true },
  imageUrl: { type: String, required: true }
});
const Upload = mongoose.model('Upload', UploadSchema);




module.exports = Upload;

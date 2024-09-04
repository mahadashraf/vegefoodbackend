const express = require('express');
const multer = require('multer');
const path = require('path');
const Upload = require('../Model/UploadCategory');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


// Create a new upload
router.post('/', upload.single('ProductImage'), async (req, res) => {
  const { ProductName, ProductPrice, ProductCategory } = req.body;
  const imageUrl = req.file ? `/public/${req.file.filename}` : '';

  const newUpload = new Upload({
    ProductName: ProductName,
    ProductPrice: ProductPrice,
    Product_category: ProductCategory,
    imageUrl:imageUrl
  });

  try {
    const savedUpload = await newUpload.save();
    res.status(201).json(savedUpload);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

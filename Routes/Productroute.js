const express = require('express');
const router = express.Router();
const Product = require('../Model/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add a new product
router.post('/', async (req, res) => {
  const { Product_name, Product_description, Product_price, Product_quantity, Product_image } = req.body;

  // Basic validation
  if (!Product_name || !Product_description || !Product_price || !Product_quantity || !Product_image) {
    return res.status(400).json({ message: 'Name, description, price, quantity, and image name are required' });
  }

  try {
    // Create a new product instance
    const newProduct = new Product({
      name: Product_name,
      description: Product_description,
      price: Product_price,
      quantity: Product_quantity,
      imageUrl: Product_image
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
});

// Route to delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

module.exports = router;

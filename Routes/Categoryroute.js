const express = require('express');
const router = express.Router();
const Category = require('../Model/Category');


// Get all Categories
router.get('/', async (req, res) => {
    try {
      const category = await Category.find();
      res.json(category);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;

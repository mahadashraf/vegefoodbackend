const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { connectDb } = require('./Config/db');
const app = express();
const { CreateProduct } = require('./Model/CreateProduct'); 
const { CreateCategory } = require('./Model/CreateCategory'); 

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDb();

// Uncomment to create initial products and categories
// CreateProduct(); 
CreateCategory();

const productRoute = require('./Routes/Productroute');
app.use('/api/products', productRoute);

const categoryRoute = require('./Routes/Categoryroute');
app.use('/api/category', categoryRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

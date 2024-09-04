const mongoose = require('mongoose');
const Product = require('./Model/Product'); // Ensure the path is correct
const { connectDb } = require('./Config/db');
// Dummy data to insert
const products = [
    {
      name: 'Bell Pepper',
      description: 'Far far away, behind the word mountains, far from the countries',
      price: 4.90,
      quantity: 1,
      imageUrl: 'https://example.com/image1.jpg'
    },
    {
      name: 'Purple Cabbage',
      description: 'Far far away, behind the word mountains, far from the countries',
      price: 15.70,
      quantity: 1,
      imageUrl: 'https://example.com/image2.jpg'
    }
  ];
  
  // Insert products into the database
  Product.insertMany(products)
    .then((docs) => {
      console.log('Products inserted:', docs);
    })
    .catch((err) => {
      console.error('Error inserting products', err);
    });

connectDb();

   Product.insertMany(products);

 

seedDatabase().catch(err => console.error(err));

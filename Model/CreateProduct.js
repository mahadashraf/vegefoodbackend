const mongoose = require('mongoose');
const Product = require('./Product');

async function CreateProduct() {
  try {
    const products = [
        {
            name: 'Bell Pepper',
            description: 'Far far away, behind the word mountains, far from the countries',
            price: 4.90,
            quantity: 1,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS7Y6NU3PDg_5DWlGPRAlUSpOz4Tnh6tw4Iw&s'
          },
          {
            name: 'Purple Cabbage',
            description: 'Far far away, behind the word mountains, far from the countries',
            price: 15.70,
            quantity: 1,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS7Y6NU3PDg_5DWlGPRAlUSpOz4Tnh6tw4Iw&s'
          }
    ];

    await Product.insertMany(products);
    console.log('Products saved successfully!');
  } catch (error) {
    console.error('Error saving products:', error);
  }
}

module.exports = { CreateProduct };

const mongoose = require('mongoose');
const Category = require('./Category');

async function CreateCategory() {
  try {
  const category = [
    {
        Product_name: 'Bell Pepper',
        Product_price: 120,
        Sale_price: 80,
        Sale_Percent: '30%',
        imageUrl: './product-1.jpg',
        Product_category: 'Vegetables'
      },
      {
        Product_name: 'Strawberry',
        Product_price: 150,
        Sale_price: 100,
        Sale_Percent: '30%',
        imageUrl: './product-2.jpg',
        Product_category: 'Fruits'
      },
      {
        Product_name: 'Peas',
        Product_price: 120,
        Sale_price: 80,
        Sale_Percent: '30%',
        imageUrl: './product-3.jpg',
        Product_category: 'Vegetables'
      },
      {
        Product_name: 'Purple Cabbage',
        Product_price: 150,
        Sale_price: 100,
        Sale_Percent: '30%',
        imageUrl: 'product-4.jpg',
        Product_category: 'Vegetables'
      },
      {
        Product_name: 'Tomatoes',
        Product_price: 120,
        Sale_price: 80,
        Sale_Percent: '30%',
        imageUrl: 'product-5.jpg',
        Product_category: 'Vegetables'
      },
      {
        Product_name: 'Broccoli',
        Product_price: 150,
        Sale_price: 100,
        Sale_Percent: '30%',
        imageUrl: 'product-6.jpg',
        Product_category: 'Vegetables'
      },
      {
        Product_name: 'Carrots',
        Product_price: 120,
        Sale_price: 80,
        Sale_Percent: '30%',
        imageUrl: 'product-7.jpg',
        Product_category: 'Vegetables'
      },
      {
        Product_name: 'Juices',
        Product_price: 150,
        Sale_price: 100,
        Sale_Percent: '30%',
        imageUrl: 'product-8.jpg',
        Product_category: 'Juice'
      },
      {
        Product_name: 'Onion',
        Product_price: 120,
        Sale_price: 80,
        Sale_Percent: '30%',
        imageUrl: 'product-9.jpg',
        Product_category: 'Vegetables'
      },
      {
        Product_name: 'Apple',
        Product_price: 150,
        Sale_price: 100,
        Sale_Percent: '30%',
        imageUrl: 'product-10.jpg',
        Product_category: 'Fruits'
      },
      {
        Product_name: 'Garlic',
        Product_price: 120,
        Sale_price: 80,
        Sale_Percent: '30%',
        imageUrl: 'product-11.jpg',
        Product_category: 'Vegetables'
      },
      {
        Product_name: 'Chilli',
        Product_price: 150,
        Sale_price: 100,
        Sale_Percent: '30%',
        imageUrl: 'product-12.jpg',
        Product_category: 'Vegetables'
      },
    {
        Product_name: 'Mango',
        Product_price: 120,
        Sale_price: 80,
        Sale_Percent: '30%',
        imageUrl: 'product-13.png',
        Product_category: 'Fruits'
      },
      {
        Product_name: 'Potatoes',
        Product_price: 150,
        Sale_price: 100,
        Sale_Percent: '30%',
        imageUrl: 'product-14.png',
        Product_category: 'Vegetables'
      },
      {
        Product_name: 'EggPlant',
        Product_price: 120,
        Sale_price: 80,
        Sale_Percent: '30%',
        imageUrl: 'product-15.png',
        Product_category: 'Vegetables'
      },
      {
        Product_name: 'Cucumber',
        Product_price: 150,
        Sale_price: 100,
        Sale_Percent: '30%',
        imageUrl: 'product-16.png',
        Product_category: 'Vegetables'
      },
      {
        Product_name: 'Peach',
        Product_price: 120,
        Sale_price: 80,
        Sale_Percent: '30%',
        imageUrl: 'product-17.png',
        Product_category: 'Fruits'
      },
      {
        Product_name: 'Grapes',
        Product_price: 150,
        Sale_price: 100,
        Sale_Percent: '30%',
        imageUrl: 'product-18.png',
        Product_category: 'Fruits'
      },
      {
        Product_name: 'Spanich',
        Product_price: 120,
        Sale_price: 80,
        Sale_Percent: '30%',
        imageUrl: 'product-20.png',
        Product_category: 'Vegetables'
      },
      {
        Product_name: 'Orange',
        Product_price: 150,
        Sale_price: 100,
        Sale_Percent: '30%',
        imageUrl: 'product-21.png',
        Product_category: 'Fruits'
      },
      {
        Product_name: 'Pineapple',
        Product_price: 120,
        Sale_price: 80,
        Sale_Percent: '30%',
        imageUrl: 'product-22.png',
        Product_category: 'Fruits'
      },
      {
        Product_name: 'Blueberry',
        Product_price: 150,
        Sale_price: 100,
        Sale_Percent: '30%',
        imageUrl: 'product-23.png',
        Product_category: 'Fruits'
      },
      {
        Product_name: 'Reddish',
        Product_price: 120,
        Sale_price: 80,
        Sale_Percent: '30%',
        imageUrl: 'product-24.png',
        Product_category: 'Vegetables'
      },
      {
        Product_name: 'WaterMelon',
        Product_price: 150,
        Sale_price: 100,
        Sale_Percent: '30%',
        imageUrl: 'product-19.png',
        Product_category: 'Fruits'
      },
      
      {
        Product_name: 'Bannana',
        Product_price: 150,
        Sale_price: 100,
        Sale_Percent: '30%',
        imageUrl: 'product-25.png',
        Product_category: 'Fruits'
      },
      
      {
        Product_name: 'Pear',
        Product_price: 150,
        Sale_price: 100,
        Sale_Percent: '30%',
        imageUrl: 'product-26.png',
        Product_category: 'Fruits'
      }
      
    ];

    await Category.insertMany(category);
    console.log('Category saved successfully!');
  } catch (error) {
    console.error('Error saving products:', error);
  }
}

module.exports = { CreateCategory };

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();
const port = 5100;
const session = require('express-session');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));



// For specific frontend URL (recommended for production)
app.use(cors({
  origin: 'https://vegefoodfrontend-umzn.vercel.app/', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));



// Session setup
app.use(session({
  secret: 'your_secret_key', // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));
// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// MongoDB Atlas URI and options
const uri = "mongodb+srv://mahadashraf850:Alpha009@cluster0.oqyzzx1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { 
  serverApi: { version: '1', strict: true, deprecationErrors: true }, 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
};

// Connect to MongoDB Atlas
mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log("MongoDB connected");

    // // Update all documents to include the 'visible' field
    // DataModel.updateMany({}, { $set: { visible: true } })
    //   .then(result => {
    //     console.log("Update Result:", result);
    //   })
    //   .catch(err => {
    //     console.error("Update Error:", err);
    //   });

  })
  .catch(err => console.error("Connection Error:", err));




const UserSchema = new mongoose.Schema({
  UserF_Name: { type: String, required: true },
  UserL_Name: { type: String, required: true },
  UserEmail: { type: String, required: true, unique: true },
  UserPhone: { type: String, required: true },
  UserPassword: { type: String, required: true },
  UserConfirmPassword: { type: String, required: true },
  visible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  dayOfWeek: {
    type: String,
    required: true,
    default: () => new Date().toLocaleString('en-US', { weekday: 'long' })
  }
});

const UserModel = mongoose.model('User', UserSchema);


app.get('/', (req, res) => {
  res.send('Hello World')
})




//user register

app.post('/register', async (req, res) => {
  try {
    const { UserF_Name, UserL_Name, UserEmail, UserPhone, UserPassword, UserConfirmPassword } = req.body;

    if (!UserF_Name || !UserL_Name || !UserEmail || !UserPhone || !UserPassword || !UserConfirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    if (!/\S+@\S+\.\S+/.test(UserEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
  
    if (!/^\d{11}$/.test(UserPhone)) {
      return res.status(400).json({ error: 'Phone number must be 11 digits long and contain only numbers' });
    }
  
    if (UserPassword !== UserConfirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(UserPassword, 10);

    const newUser = new UserModel({
      UserF_Name,
      UserL_Name,
      UserEmail,
      UserPhone,
      UserPassword: hashedPassword,
      UserConfirmPassword: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


// user login

// User login route
app.post('/login', async (req, res) => {
  try {
    const { UserEmail, UserPassword } = req.body;

    if (!UserEmail || !UserPassword) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await UserModel.findOne({ UserEmail });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(UserPassword, user.UserPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    req.session.userId = user._id; // Store user ID in session
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware to check authentication
const checkAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};


// fetch users

// Route to get all users
app.get('/GetUsers', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Route to get a user by ID
app.get('/GetUser/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});






// Define a schema and model for MongoDB
const DataSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productSalePrice: { type: Number },
  productCategory: { type: String, required: true },
  productDescription: { type: String, required: true },
  image: { type: String, required: true },
  visible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  dayOfWeek: { type: String, required: true, default: () => new Date().toLocaleString('en-US', { weekday: 'long' }) }

});

const DataModel = mongoose.model('Data', DataSchema);







// Route to get a Product by ID
app.get('/GetProducts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await DataModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});





// Route to handle data and image upload
app.post('/upload', upload.single('file'), (req, res) => {
  const { productName, productPrice, productSalePrice, productCategory, productDescription } = req.body;
  const imageFilename = req.file ? req.file.filename : null;

  if (!productName || !productPrice || !productCategory || !productDescription || !imageFilename) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  DataModel.create({ productName, productPrice, productSalePrice, productCategory, productDescription, image: imageFilename })
    .then(result => res.status(201).json(result))
    .catch(err => {
      console.error('Error saving product:', err);
      res.status(500).json({ message: 'Error saving product', error: err.message });
    });
});

// Route to update product by ID


// Route to update product by ID with image upload
app.put('/updateProduct/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    if (req.file) {
      updateData.image = req.file.filename; // Save the image filename in the database
    }

    const result = await DataModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: result });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});





// Route to delete a product by ID
app.delete('/deleteUser/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    const result = await DataModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});
// Route to get a product by ID
app.get('/GetUser/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    const result = await DataModel.findById(id);
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});




// Route to hide a product by ID (set visible to false)
app.put('/hideProduct/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    const result = await DataModel.findByIdAndUpdate(id, { visible: false }, { new: true });
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product hidden successfully', product: result });
  } catch (error) {
    console.error('Error hiding product:', error);
    res.status(500).json({ message: 'Error hiding product', error: error.message });
  }
});




// Route to get all visible products
app.get('/getImage', (req, res) => {
  DataModel.find({ visible: true }) // Only fetch visible products
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.error('Error fetching products:', err);
      res.status(500).json({ message: 'Error fetching products', error: err.message });
    });
});


// Route to get all products (including hidden ones)
app.get('/getAllProducts', (req, res) => {
  DataModel.find({})
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.error('Error fetching products:', err);
      res.status(500).json({ message: 'Error fetching products', error: err.message });
    });
});






// Route to get category counts
app.get('/getCategoryCounts', async (req, res) => {
  try {
    const counts = await DataModel.aggregate([
      {
        $group: {
          _id: "$productCategory",
          count: { $sum: 1 }
        }
      }
    ]);

    // Format the counts to match the chart data format
    const formattedCounts = counts.map(item => ({
      name: item._id,
      value: item.count
    }));

    res.status(200).json(formattedCounts);
  } catch (error) {
    console.error('Error fetching category counts:', error);
    res.status(500).json({ message: 'Error fetching category counts', error: error.message });
  }
});



app.get('/getProductsByCategoryAndDay', async (req, res) => {
  try {
    const products = await DataModel.aggregate([
      {
        $group: {
          _id: {
            day: { $dayOfWeek: "$createdAt" },
            category: "$productCategory"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.day",
          categories: {
            $push: {
              category: "$_id.category",
              count: "$count"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          day: "$_id",
          categories: {
            $arrayToObject: {
              $map: {
                input: "$categories",
                as: "category",
                in: {
                  k: "$$category.category",
                  v: "$$category.count"
                }
              }
            }
          }
        }
      },
      {
        $sort: { day: 1 }
      }
    ]);

    // Mapping day number to the corresponding day name
    const dayMapping = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
    const formattedData = products.map(product => ({
      day: dayMapping[product.day - 1],
      categories: product.categories
    }));

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

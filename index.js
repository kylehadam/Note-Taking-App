const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/notes'); // Import the routes

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', true); // Set strictQuery option

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() => {
   console.log('Connected to MongoDB');
}).catch((error) => {
   console.error('MongoDB connection error:', error);
});

app.use('/api', noteRoutes); // Use the routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

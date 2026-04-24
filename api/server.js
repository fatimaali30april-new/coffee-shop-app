const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sahi Path: Kyunke ye file 'api' folder mein hai, isay '../public' use karna hoga
app.use(express.static(path.join(__dirname, '../public')));

// Routes
const productRoutes = require('../routes/productRoutes');
app.use('/api/products', productRoutes);

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

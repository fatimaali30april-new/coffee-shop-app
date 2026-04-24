const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000; // This is the only one you need!

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Contact Form Endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`New Message from ${name}: ${message}`);
    res.status(200).json({ success: true, message: "Message received successfully!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

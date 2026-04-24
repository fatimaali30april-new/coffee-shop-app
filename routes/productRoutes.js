const express = require('express');
const router = express.Router();

let products = [
    // --- COFFEE (5 Items) ---
    { id: 1, name: "Lavender Latte", category: "Coffee", price: 5.50, description: "Signature espresso infused with organic lavender and honey.", image: "https://images.unsplash.com/photo-1572286258217-40142c1c6a70?w=500" },
    { id: 2, name: "Pistachio Cold Brew", category: "Coffee", price: 6.25, description: "Slow-steeped cold brew topped with silky pistachio cream foam.", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500" },
    { id: 3, name: "Charcoal Mocha", category: "Coffee", price: 5.75, description: "A unique, earthy blend of activated charcoal and dark cocoa.", image: "https://images.unsplash.com/photo-1534706936160-d5ee67737249?w=500" },
    { id: 4, name: "Vanilla Macchiato", category: "Coffee", price: 4.95, description: "Layered espresso with Madagascar vanilla and velvet foam.", image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500" },
    { id: 5, name: "Classic Cortado", category: "Coffee", price: 3.50, description: "Equal parts double espresso and steamed milk for a bold finish.", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500" },

    // --- CAKES (5 Items) ---
    { id: 6, name: "Honey Lavender Sponge", category: "Cakes", price: 7.50, description: "Light, airy sponge cake with floral notes and honey glaze.", image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500" },
    { id: 7, name: "Matcha Velvet Layer", category: "Cakes", price: 8.00, description: "Ceremonial matcha layers with light mascarpone frosting.", image: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=500" },
    { id: 9, name: "Dark Chocolate Fudge", category: "Cakes", price: 7.25, description: "Rich 70% cocoa fudge cake with a sea salt caramel core.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500" },
    { id: 10, name: "Strawberry Shortcake", category: "Cakes", price: 6.50, description: "Classic layers of fresh cream and local strawberries.", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500" },

    // --- PASTRIES (5 Items) ---
    { id: 11, name: "Almond Croissant", category: "Pastries", price: 4.50, description: "Twice-baked butter croissant with almond frangipane.", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500" },
    { id: 12, name: "Pain au Chocolat", category: "Pastries", price: 4.25, description: "Flaky puff pastry wrapped around dark chocolate batons.", image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=500" },
    { id: 13, name: "Blueberry Danish", category: "Pastries", price: 4.75, description: "Butter pastry with fresh berries and citrus cream.", image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=500" },
    { id: 14, name: "Cinnamon Swirl", category: "Pastries", price: 3.95, description: "Spiced cinnamon sugar rolled in buttery brioche dough.", image: "https://images.unsplash.com/photo-1509339022327-1e1e25360a41?w=500" },
    
    // --- JUICES (5 Items) ---
    { id: 16, name: "Golden Sunrise", category: "Juices", price: 6.00, description: "Turmeric, orange, ginger, and black pepper for a boost.", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500" },
    { id: 17, name: "Green Detox", category: "Juices", price: 6.50, description: "Kale, green apple, cucumber, and a hint of mint.", image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=500" },
    { id: 19, name: "Watermelon Cooler", category: "Juices", price: 5.25, description: "100% pure watermelon with zero added sugar.", image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=500" },
    { id: 20, name: "Hibiscus Iced Tea", category: "Juices", price: 4.50, description: "Floral hibiscus tea brewed fresh with agave syrup.", image: "https://images.unsplash.com/photo-1553531384-397c80973a0b?w=500" }
];

// Get all products
router.get('/', (req, res) => res.json(products));

// Add new product
router.post('/', (req, res) => {
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Update product
router.put('/:id', (req, res) => {
    const index = products.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        products[index] = { id: Number(req.params.id), ...req.body };
        res.json(products[index]);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

// Delete product (YE WALA HISSA ADD KIYA HAI)
router.delete('/:id', (req, res) => {
    products = products.filter(p => p.id != req.params.id);
    res.json({ message: "Product deleted successfully" });
});

module.exports = router;

<<<<<<< HEAD
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());
app.use(express.static('public'));


mongoose.connect('mongodb://localhost:27017/foodDelivery', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const orderSchema = new mongoose.Schema({
    restaurant: String,
    items: Array,
    totalPrice: Number,
    timestamp: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);


const restaurants = JSON.parse(fs.readFileSync('restaurants.json'));


app.get('/restaurants', (req, res) => {
    res.json(restaurants);
});


app.post('/order', async (req, res) => {
    try {
        const { restaurant, items, totalPrice } = req.body;
        const newOrder = new Order({ restaurant, items, totalPrice });
        await newOrder.save();
        res.json({ message: 'Order placed successfully!', order: newOrder });
    } catch (err) {
        res.status(500).json({ message: 'Error placing order', error: err });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
=======
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public")); // Serve static files from 'public' folder

// Expanded Restaurant Data
const restaurants = [
    {
        "name": "Pizza Palace",
        "image": "/images/pizza.jpg",
        "menu": [
            { "name": "Margherita Pizza", "price": 10 },
            { "name": "Pepperoni Pizza", "price": 12 },
            { "name": "BBQ Chicken Pizza", "price": 14 }
        ]
    },
    {
        "name": "Burger Haven",
        "image": "/images/burger.jpg",
        "menu": [
            { "name": "Classic Cheeseburger", "price": 8 },
            { "name": "Veggie Burger", "price": 7 },
            { "name": "Double Patty Burger", "price": 10 }
        ]
    },
    {
        "name": "Sushi Spot",
        "image": "/images/sushi.jpg",
        "menu": [
            { "name": "California Roll", "price": 12 },
            { "name": "Salmon Nigiri", "price": 15 },
            { "name": "Tuna Sashimi", "price": 18 }
        ]
    },
    {
        "name": "Taco Town",
        "image": "/images/taco.jpg",
        "menu": [
            { "name": "Chicken Taco", "price": 5 },
            { "name": "Beef Taco", "price": 6 },
            { "name": "Veggie Taco", "price": 4 }
        ]
    },
    {
        "name": "Pasta Paradise",
        "image": "/images/pasta.jpg",
        "menu": [
            { "name": "Spaghetti Carbonara", "price": 12 },
            { "name": "Penne Arrabbiata", "price": 10 },
            { "name": "Lasagna", "price": 14 }
        ]
    }
];

app.get("/restaurants", (req, res) => {
    res.json(restaurants);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
>>>>>>> 6003ba2 (Updated .gitignore and removed node_modules)

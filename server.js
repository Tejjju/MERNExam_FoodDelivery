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

const express = require('express');
const compression = require('compression');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(compression());
app.use(cors());

const order = [
  { id: 1, name: 'Cool Shirt', price: 25.0, qty: 3, weight: 0.5 },
  { id: 2, name: 'Cool Pants', price: 45.0, qty: 2, weight: 1 },
  { id: 3, name: 'Light Saber', price: 125.0, qty: 1, weight: 5 }
];

const shipping = {
  carrier: 'UPS',
  address: {
    name: 'Amanda Miller',
    phone: '555-555-5555',
    address_line1: '525 S Winchester Blvd',
    city_locality: 'San Jose',
    state_province: 'CA',
    postal_code: '95128',
    country_code: 'US'
  },
  cost: 0
}

const tax = {
  amount: 0.07,
};

app.get('/order', (req, res) => {
  try {
    res.json({ order: order });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the order.' });
  }
});

app.get('/shipping', (req, res) => {
  try {
    const weight = req.query.weight;
    if (!weight || isNaN(weight)) {
      return res.status(400).json({ error: 'Invalid weight parameter.' });
    }
    shipping.cost = calculateShippingCost(Number(weight));
    res.json({ shipping: shipping });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the shipping details.' });
  }
});

app.get('/tax', (req, res) => {
  try {
    res.json({ tax: tax });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the tax details.' });
  }
});

function calculateShippingCost(weight) {
  // Some calculation
  return 7.99;
}

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

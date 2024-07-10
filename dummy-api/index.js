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

function authentication(req, res, next){
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    let err = new Error('Unauthorized access!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err)
  }

  const authCredentials = authHeader.split(' ')[1];
  const auth = new Buffer.from(authCredentials,'base64').toString().split(':');
  const username = auth[0];
  const password = auth[1];

  if (username == 'admin' && password == 'password') {

    next();
  } else {
    let err = new Error('Unauthorized access!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }
}

app.use(authentication);

app.get('/order', (req, res, next) => {
  res.json({ order: order });
});

app.get('/shipping', (req, res, next) => {
  const weight = req.query.weight;
  if (!weight || isNaN(weight) || weight < 0) {
    const err = new Error('Invalid weight parameter.');
    err.status = 400;
    next(err);
  }
  shipping.cost = calculateShippingCost(Number(weight));
  res.json({ shipping: shipping });
});

app.get('/tax', (req, res, next) => {
  res.json({ tax: tax });
});

function calculateShippingCost(weight) {
  // Some calculation
  return 7.99;
}

app.use((req, res, next) => {
  const err = new Error("Endpoint not found")
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'An error occurred processing the request.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

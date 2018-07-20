const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

// connection database
mongoose.connect(config.connectionString)
mongoose.connection.on('error', (err) => {
    console.error('Error in connection, my friend');
    process.exit(1);
})

// load models
const Product = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')

// load routes
const index = require('./routes/index');
const product = require('./routes/product');
const customer = require('./routes/customer')
const order = require('./routes/order');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index);
app.use('/products', product);
app.use('/customers', customer);
app.use('/orders', order);

module.exports = app;

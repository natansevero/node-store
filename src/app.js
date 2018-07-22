const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

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

app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', index);
app.use('/products', product);
app.use('/customers', customer);
app.use('/orders', order);

module.exports = app;

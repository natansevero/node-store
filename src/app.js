const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// connection database
mongoose.connect('mongodb://localhost:27017/nodestore')
mongoose.connection.on('error', (err) => {
    console.error('Error in connection, my friend');
    process.exit(1);
})

// load models
const Product = require('./models/product')

// load routes
const index = require('./routes/index');
const product = require('./routes/product');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index);
app.use('/products', product);

module.exports = app;

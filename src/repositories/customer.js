const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = async data => {
    let customer = new Customer(data);
    return await customer.save();
}
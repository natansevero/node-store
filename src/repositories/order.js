const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async data => {
    return await Order.find({}, 'number status customer items')
        .populate('customer', 'name')
        .populate('items.product', 'title')
}

exports.create = async data => {
    let order = new Order(data);
    return await order.save();
}
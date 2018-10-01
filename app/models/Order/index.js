const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        customer_id: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        product_ids: { type: [String], required: true },
        status: { type: String, required: false, default: 'WAIT' },
        transaction_id: { type: String, required: false, default: false }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Order', orderSchema);
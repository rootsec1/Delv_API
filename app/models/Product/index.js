const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true, text: true },
        category: { type: String, required: true, text: true },
        manufacturer: { type: String, required: true, text: true },
        price: { type: Number, required: true },
        colors: { type: [String], required: false, default: [] },
        discount: { type: Number, required: false, default: 0 },
        priority: { type: Number, required: false, default: 0 },
        store_id: { type: String, required: true },
        rating: { type: Number, required: false, default: 5 },
        images: { type: [String], required: false, default: [] }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', productSchema);
const mongoose = require('mongoose');

const storeSchema = mongoose.Schema(
    {
        _id : { type: String, required: true },
        name: { type: String, required: true, text: true, trim: true, index: true },
        department: { type: String, required: true, trim: true, index: true },
        phone: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        images: { type: [String], required: false, default: [] },
        //DELIVERY
        delivery_service: { type: Boolean, required: true, default: false },
        delivery_distance_threshold: { type: Number, required: false, default: 3 },
        extra_distance_unit_cost: { type: Number, required: false, default: 6 },
        free_delivery_cost_threshold: { type: Number, required: false, default: 100 },
        //ACCOUNT
        account_number: { type: String, required: false, default: null },
        account_holder_name: { type: String, required: false, default: null },
        ifsc: { type: String, required: false, default: null }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Store', storeSchema);
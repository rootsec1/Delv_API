const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
    {
        uid: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        account_number: { type: String, required: false, default: null },
        account_holder_name: { type: String, required: false, default: null },
        ifsc: { type: String, required: false, default: null }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Customer', customerSchema);
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    transaction_amount: { type: Number, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    date: { type: Date, required: true },
    description: { type: String }
});

module.exports = mongoose.model('Transactions', transactionSchema);
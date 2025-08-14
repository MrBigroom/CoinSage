const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    budget_amount: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true }
});

module.exports = mongoose.model('Budgets', budgetSchema);
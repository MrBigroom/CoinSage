const mongoose = require('mongoose');

const aiModelLogSchema = new mongoose.Schema({
    transaction_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Transactions', required: true },
    predicted_category: { type: String, required: true },
    confidence_score: { type: Number, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AI_Model_Log', aiModelLogSchema)
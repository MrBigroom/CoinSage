const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    budgets: [{ category: String, limit: Number }]
});
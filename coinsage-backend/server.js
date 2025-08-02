const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/coinsage');     // temporal mongodb url

// app.use('/api/transactions', require('./routes/transactions'));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
    console.log(`Accessible on your network at: http://192.168.0.172:${PORT}`);
});
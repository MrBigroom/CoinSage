const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
    }
})
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password_hash);
        if(!passwordMatch) {
            return res.status(400).json({ error: 'Password does not match' });
        }

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/signup', async(req, res) => {
    try {
        if(!req.body.username || !req.body.email || req.body.password) {
            return res.status(400).json({ error: 'Missing fields!' });
        }

        const exists = await Users.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        });

        if(exists) {
            return res.status(400).json({ error: 'Email or username already in use' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 8);

        const user = new Users({
            username: req.body.username,
            email: req.body.email,
            password_hash: hashedPassword
        });
        await user.save();

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({ token, user });
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
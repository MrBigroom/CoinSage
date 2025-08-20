const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth');
const Transactions = require('../models/Transactions');
const Category = require('../models/Category');

router.patch('/:id', authenticate, async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['transaction_amount', 'category_id', 'date', 'description'];
    const isValidOperation = updates.every(update => 
        allowedUpdates.includes(update)
    );

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const transaction = await Transactions.findOne({
            _id: req.params.id,
            user_id: req.user._id
        });

        if(!transaction) {
            return res.status(404).send({ error: 'Transaction not found' });
        }

        if(req.body.category_id) {
            const category = await Category.findById(req.body.category_id);
            if(!category) {
                return res.status(400).json({ error: 'Invalid category' });
            }
        }

        updates.forEach(update => {
            transaction[update] = req.body[update];
        });
        await transaction.save();
        res.send(transaction);
    } catch(err) {
        res.status(400).send({ error: err.message });
    }
});

router.post('/', authenticate, async(req, res) => {
    try {
        if(req.body.category_id) {
            const category = await Category.findById(req.body.category_id);
            if(!category) {
                return res.status(400).json({ error: 'Invalid category' });
            }
        } 

        const transaction = new Transactions({
            ...req.body,
            user_id: req.user._id
        });
        await transaction.save();
        res.status(201).send(transaction);
    } catch(err) {
        res.status(400).send({ error: err.message });
    }
});

module.exports = router;
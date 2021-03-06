const express = require('express');
const bcrypt = require('bcryptjs');

const { ObjectId } = require('mongodb');
const { userSelect } = require('../utils/variables');
const { mongoose } = require('../db/mongoose');
const { User } = require('../models/user');

const router = express.Router();

router.get('/allUsers', async (req, res) => {
    try {
        const users = await User.find({}, userSelect);
        if (!users) res.status(404).send({ statusCode: -1, message: 'Users not found' });

        res.status(200).send({ statusCode: 1, users });
    } catch (err) {
        res.status(400).send({ statusCode: -1, catchError: err });
    }
});

router.post('/addNewUser', async (req, res) => {
    try {
        const testUser = await User.findOne({ email: req.body.email });
        if (testUser) return res.status(403).send({ statusCode: -1, message: 'Email already exists' });

        const user = await new User(req.body);
        await user.save(err => {
            if (err) return res.status(400).send({ statusCode: -1, err });
        });

        res.status(200).send({ statusCode: 1, user });
    } catch (err) {
        res.status(400).send({ statusCode: -1, catchError: err });
    }
});

router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send({ statusCode: -1, message: 'User not found' });
        res.status(200).send({ statusCode: 1, user });
    } catch (err) {
        res.status(400).send({ statusCode: -1, catchError: err });
    }
});

router.patch('/changePassword', async (req, res) => {
    try {
        const id = req.body.id;
        if (!ObjectId.isValid(id)) return res.status(404).send({ statusCode: -1, message: 'Invalid id' });
        const user = await User.findById(id);

        if (user && bcrypt.compareSync(req.body.currentPassword, user.password)) {
            user.password = req.body.newPassword;
        
            await user.save((err) => {
                if (err) return res.status(400).send({ statusCode: -1, message: 'User save to DB error' });
            });

            return res.status(200).send({ statusCode: 1, user });
        }

        res.status(401).send({ statusCode: -1, message: 'Password does not match' });
    } catch (err) {
        res.status(400).send({ statusCode: -1, catchError: err });
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(404).send();
    
    try {
        const user = await User.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true })
            .select(userSelect);
    
        if (!user) return res.status(404).send({ statusCode: -1, message: 'User not found' });
        else return res.status(200).send({ statusCode: 1, user });
    } catch (err) {
        return res.status(400).send({ statusCode: -1, catchError: err });
    }
});

module.exports = router;

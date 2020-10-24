const crypto = require('crypto');
const express = require('express');
const bcrypt = require('bcryptjs');
// const multer = require('multer');
// const cloudinary = require('cloudinary');
// const cloudinaryStorage = require('multer-storage-cloudinary');

const { ObjectId } = require('mongodb');
const { userSelect } = require('../utils/variables');
const { mongoose } = require('../db/mongoose');
const { User } = require('../models/user');

const router = express.Router();

// cloudinary.config({
//     cloud_name: 'dh8es6bea',
//     api_key: '997478438753413',
//     api_secret: 'EbGQgGocSMRFDqbcmxtndzrR3WU',
// });
// const storage = cloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: 'profilePics',
//     filename: function (req, file, cb) {
//         cb(undefined, req.params.userId)
//     },
//     format: 'jpg',
//     transformation: {
//         crop: 'fill',
//         gravity: 'face:center',
//     }
// });
// const parser = multer({ storage: storage });

// User pic upload
// router.post('/profilePic/:userId', parser.single('image'), (req, res) => {
//     const image = req.file.secure_url;
//     res.status(200).send(image);
// });

router.get('/allUsers', async (req, res) => {
    try {
        const users = await User.find({}, userSelect);
        if (!users) res.status(404).send();

        res.status(200).send({ statusCode: 1, users });
    } catch (err) {
        res.status(400).send({ statusCode: -1, err });
    }
});

// POST new user to db
router.post('/addNewUser', async (req, res) => {
    const userData = {
        password: req.body.password,
        email: [req.body.email],
    };
    
    const user = await new User(userData);

    await user.save(err => {
        if (err) return res.status(400).send(err);
    });

    res.status(200).send({ statusCode: 1, user });
});

// PATCH change user password
router.patch('/changePassword', async (req, res) => {
    try {
        const user = await User.findById(req.body.id);

        if (user && bcrypt.compareSync(req.body.currentPassword, user.password)) {
            user.password = req.body.newPassword;
        
            await user.save((err) => {
                if (err) return res.status(400).send();
            });

            return res.status(200).send();
        }

        res.status(401).send();
    } catch (err) {
        res.status(400).send(err);
    }
});

// PATCH user 
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(404).send();
    
    try {
        const user = await User.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true })
            .select(userSelect);
    
        if (!user) return res.status(404).send();
        else return res.status(200).send(user);
    } catch (err) {
        return res.status(400).send(err);
    }
});

module.exports = router;

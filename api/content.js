const express = require('express');
// const multer = require('multer');
// const cloudinary = require('cloudinary');
// const cloudinaryStorage = require('multer-storage-cloudinary');

const { ObjectId } = require('mongodb');
const { mongoose } = require('../db/mongoose');
const { Page } = require('../models/page');
const { Media } = require('../models/media');

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

router.get('/allPages', async (req, res) => {
    try {
        const pages = await Page.find({}).populate({ path: 'media' });
        if (!pages) res.status(404).send();

        res.status(200).send({ statusCode: 1, pages });
    } catch (err) {
        res.status(400).send({ statusCode: -1, err });
    }
});

router.post('/addNewPage', async (req, res) => {
    try {
        const page = await new Page(req.body.page);

        await page.save(err => {
            if (err) return res.status(400).send(err);
        });

        res.status(200).send({ statusCode: 1, page });
    } catch (err) {
        res.status(400).send({ statusCode: -1, err });
    }
});

router.patch('/removeItem', async (req, res) => {
    try {
        const title = req.body.title;
        const which = req.body.which;

    } catch (err) {
        res.status(400).send({ statusCode: -1, err });
    }
});

router.patch('/removePicFromDB', async (req, res) => {
    try {
        const title = req.body.title;
        const pic = req.body.pic;
        const page = await Page.findOneAndUpdate({ title }, { $pull: pic }, { new: true });
        if (!page) return res.status(404).send({ statusCode: -1, message: 'Page not found in DB' });

        res.status(200).send({ statusCode: 1, page });
    } catch (err) {
        res.status(400).send({ statusCode: -1, err });
    }
});

router.patch('/replacePage/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const page = await Page.findOneAndReplace({ title }, { $set: req.body }, { new: true });
    
        if (!page) return res.status(404).send({ statusCode: -1, message: 'Page not found in DB' });
        else res.status(200).send({ statusCode: 1, page });
    } catch (err) {
        res.status(400).send({ statusCode: -1, err });
    }
});

router.patch('/addToPage/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const page = await Page.findOneAndUpdate({ title }, { $push: req.body }, { new: true });

        if (!page) return res.status(404).send({ statusCode: -1, message: 'Page not found in DB' });
        else res.status(200).send({ statusCode: 1, page });
    } catch (err) {
        res.status(400).send({ statusCode: -1, err });
    }
});

router.patch('/addPicToPage/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const pic = req.body.pic;
        const media = await Media.findByIdAndUpdate(id, { $push: { pics: pic } }, { new: true });

        if (!media) return res.status(404).send({ statusCode: -1, message: 'Page media not found in DB' });
        else res.status(200).send({ statusCode: 1, media });
    } catch (err) {
        res.status(400).send({ statusCode: -1, err });
    }
});

router.delete('/deletePage/:id', async (req, res) => {
    try {
        const page = await Page.findByIdAndDelete(req.params.id);
        if (!page) return res.status(404).send({ statusCode: -1, message: 'Page not found in DB' });
        
        res.status(200).send({ statusCode: 1, page });
    } catch (err) {
        res.status(400).send({ statusCode: -1, err });
    }
});

module.exports = router;

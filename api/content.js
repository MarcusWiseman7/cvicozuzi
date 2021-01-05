const express = require('express');
const cloudinary = require('cloudinary');

const { ObjectId } = require('mongodb');
const { mongoose } = require('../db/mongoose');
const { Page } = require('../models/page');
const { Media } = require('../models/media');

const router = express.Router();

cloudinary.config({
    cloud_name: 'dqrpaoopz',
    api_key: '675759856271814',
    api_secret: 'IN1POh8U1pmLRRYHbh2buWNGzuA',
});

router.get('/allPages', async (req, res) => {
    try {
        console.log('req allPages');
        // const pages = await Page.find({}).populate({ path: 'media' });
        const pages = await Page.find({});
        if (!pages) res.status(404).send();
        console.log('pages :>> ', pages);

        res.status(200).send({ statusCode: 1, pages });
    } catch (err) {
        res.status(400).send({ statusCode: -1, catchError: err });
    }
});

router.post('/addNewPage', async (req, res) => {
    try {
        console.log('adding page...', req.body);
        const data = {
            title: req.body.page.title,
            text: req.body.page.text,
        };
        const media = req.body.page.media;

        const page = await new Page(data);

        media.forEach(async m => {
            let nm = await new Media(m);
            await nm.save(err => {
                if (err) return res.status(400).send({ statusCode: -1, err });
            });
            page.media.push(nm._id);
        });

        await page.save(err => {
            if (err) return res.status(400).send({ statusCode: -1, err });
        });

        res.status(200).send({ statusCode: 1, page });
    } catch (err) {
        res.status(400).send({ statusCode: -1, catchError: err });
    }
});

router.patch('/removeItem', async (req, res) => {
    try {
        const title = req.body.title;
        const which = req.body.which;
    } catch (err) {
        res.status(400).send({ statusCode: -1, catchError: err });
    }
});

router.patch('/replacePage/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const page = await Page.findOneAndReplace({ title }, { $set: req.body }, { new: true });

        if (!page) return res.status(404).send({ statusCode: -1, message: 'Page not found in DB' });
        else res.status(200).send({ statusCode: 1, page });
    } catch (err) {
        res.status(400).send({ statusCode: -1, catchError: err });
    }
});

router.patch('/addToPage/:title', async (req, res) => {
    try {
        const title = req.params.title;
        const page = await Page.findOneAndUpdate({ title }, { $push: req.body }, { new: true });

        if (!page) return res.status(404).send({ statusCode: -1, message: 'Page not found in DB' });
        else res.status(200).send({ statusCode: 1, page });
    } catch (err) {
        res.status(400).send({ statusCode: -1, catchError: err });
    }
});

router.patch('/updatePageText', async (req, res) => {
    try {
        const id = req.body.id;
        const text = req.body.text;
        const page = await Page.findByIdAndUpdate(id, { $set: { text } }, { new: true });

        if (!page) return res.status(404).send({ statusCode: -1, message: 'Page not found in DB' });
        else res.status(200).send({ statusCode: 1, page });
    } catch (err) {
        res.status(400).send({ statusCode: -1, catchError: err });
    }
});

router.patch('/addPicToPage', async (req, res) => {
    try {
        const mediaId = req.body.mediaId;
        const picURL = req.body.picURL;
        const media = await Media.findByIdAndUpdate(mediaId, { $push: { pics: picURL } }, { new: true });

        if (!media) return res.status(404).send({ statusCode: -1, message: 'Page media not found in DB' });
        res.status(200).send({ statusCode: 1, media });
    } catch (err) {
        res.status(400).send({ statusCode: -1, catchError: err });
    }
});

router.patch('/updatePagePics', async (req, res) => {
    try {
        const id = req.body.c._id;
        const pics = req.body.c.pics;
        const media = await Media.findByIdAndUpdate(id, { $set: { pics } }, { new: true });

        if (!media) return res.status(404).send({ statusCode: -1, message: 'Page media not found in DB' });
        res.status(200).send({ statusCode: 1, media });
    } catch (err) {
        res.status(400).send({ statusCode: -1, catchError: err });
    }
});

router.patch('/removePicFromPage', async (req, res) => {
    try {
        const mediaId = req.body.mediaId;
        const picURL = req.body.picURL;
        const publicId = 'zuzana/' + picURL.slice(picURL.lastIndexOf('/') + 1, picURL.lastIndexOf('.'));

        // Remove from DB
        const media = await Media.findByIdAndUpdate(mediaId, { $pull: { pics: picURL } }, { new: true });
        if (!media) return res.status(404).send({ statusCode: -1, message: 'Page media not found in DB' });

        // Destroy from cloudinary
        await cloudinary.v2.uploader.destroy(publicId, function(error, result) {
            if (error)
                return res.status(400).send({
                    statusCode: -1,
                    message: 'Error removing pic from Cloudinary',
                    error,
                });
        });

        res.status(200).send({ statusCode: 1, media });
    } catch (err) {
        res.status(400).send({ statusCode: -1, catchError: err });
    }
});

router.delete('/deletePage/:id', async (req, res) => {
    try {
        const page = await Page.findByIdAndDelete(req.params.id);
        if (!page) return res.status(404).send({ statusCode: -1, message: 'Page not found in DB' });

        res.status(200).send({ statusCode: 1, page });
    } catch (err) {
        res.status(400).send({ statusCode: -1, catchError: err });
    }
});

module.exports = router;

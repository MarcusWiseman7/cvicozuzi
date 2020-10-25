const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = new Schema({
    title: { type: String, trim: true },
    text: [{ body: String, which: String }],
    pics: [{ type: String, trim: true }],
}, { usePushEach: true });

const Page = mongoose.model('Page', PageSchema);

module.exports = { Page };

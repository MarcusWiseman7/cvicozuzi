const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = new Schema({
    title: { type: String, trim: true },
    text: [{ which: String, body: String }],
    media: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
}, { usePushEach: true });

const Page = mongoose.model('Page', PageSchema);

module.exports = { Page };

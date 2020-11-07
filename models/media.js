const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
    which: { type: String, required: true, trim: true },
    pics: [],
}, { usePushEach: true });

const Media = mongoose.model('Media', MediaSchema);

module.exports = { Media };

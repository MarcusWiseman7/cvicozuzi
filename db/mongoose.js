// Mongo database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Cvicozuzi');

module.exports = { mongoose };

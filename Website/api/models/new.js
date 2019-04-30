const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    title: String,
    subTitle: String,
    writer: String,
    date: Date,
    keywords: String,
    image: String,
    smallImage: String,
    content: String,
    createdOn: { type: Date, default: Date.now()}
});

module.exports =  mongoose.model('New', newSchema);

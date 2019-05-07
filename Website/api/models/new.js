const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    title: String,
    subTitle: [String],
    writer: String,
    date: String,
    map: Boolean,
    keywords: [String],
    image: [{name: String, url: String, _id: false}],
    smallImage: [{name: String, url: String, _id: false}],
    content: [String],
    createdOn: { type: Date, default: Date.now()}
});

module.exports =  mongoose.model('New', newSchema);

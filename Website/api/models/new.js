const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    title: String,
    subTitles: [{sub: String, id: Number, _id:false}],
    writer: String,
    date: String,
    map: Boolean,
    coordinates: [{lat: Number, lng: Number, _id:false}],
    keywords: [String],
    images: [{name: String, url: String,id: Number, _id: false}],
    smallImages: [{name: String, url: String,id: Number, _id: false}],
    contents: [{cont: String,id: Number, _id:false}],
    createdOn: {type: Date, default: Date.now()}
});

module.exports =  mongoose.model('New', newSchema);

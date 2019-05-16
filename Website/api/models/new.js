const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    title: String,
    subTitle: [{sub: String, id: Number, _id:false}],
    writer: String,
    date: String,
    map: Boolean,
    coordinates: [{lat: Number, lng: Number}],
    keywords: [String],
    image: [{name: String, url: String,id: Number, _id: false}],
    smallImage: [{name: String, url: String,id: Number, _id: false}],
    content: [{cont: String,id: Number, _id:false}],
    createdOn: {type: Date, default: Date.now()}
});

module.exports =  mongoose.model('New', newSchema);

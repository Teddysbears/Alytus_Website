const mongoose = require('mongoose');

const keywordSchema = new mongoose.Schema({
    word: String,
    trad: String,
    count: Number,
    type: String,
    isLocation: Boolean,
    coordinates: [{lat:Number, lng: Number, __id:false}]
});

module.exports =  mongoose.model('Keyword', keywordSchema);

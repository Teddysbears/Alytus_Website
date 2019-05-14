const express = require('express');
const router = express.Router();
const News = require('../models/new');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');



router.get('', (req,res) => {
   res.status(200).json({msg: 'homepage'});
});

router.get('/ping', (req, res) => {
    res.status(200).json({ msg: 'pong', date: new Date()});
});

router.get('/News',(req, res) => {
    News.find()
        .sort({'createdOn': -1})
        .exec()
        .then(news => res.status(200).json(news))
        .catch(err => res.status(500).json({
            message: 'news not found', err: err
        }));
});


router.get('/News/:id', (req,res) => {
    const id = req.params.id;
    News.findById(id)
        .then(New => res.status(200).json(New))
        .catch(err => res.status(404).json({
            message:`New with id : ${id} not found`, err: err
        }));
});

router.post('/News', (req,res)=> {
    const New = new News(req.body);
    New.save((err, News) =>{
        if(err) return res.status(500).json(err);
        res.status(201).json(News);
    });
});

//file upload configuration
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, callback) => {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return callback(err);
            //callback(null, raw.toString('hex') + path.extname(file.originalname));
            lastUploadedImageName = raw.toString('hex') + path.extname(file.originalname);
            console.log('lastUploadedImage', lastUploadedImageName);
            callback(null,lastUploadedImageName);
        });
    }

});
let upload = multer({storage: storage});

//file upload
router.post('/server/images', upload.single('image'), (req,res) => {
    if(!req.file.originalname.match(/\.(jpg|png|jpeg|gif)$/)){
        return res.status(400).json({msg: 'only jpeg, jpg, gif and png are authorized'});
    } else {
        res.status(201).send({filename: req.file.filename, file: req.file});
    }
});

let lastUploadedImageName = '';


router.delete('/News/:id', (req,res) => {
    const id = req.params.id;
    News.findByIdAndDelete(id, (err,news) => {
        if(err) return res.status(404).json(err);
        if(!news) return res.status(404).json({message: `news with ${id} not found`});
        res.status(202).json({message: `news with id : ${news._id} has been deleted with success`});
    });
});

router.delete('/News', (req,res) => {
    const ids = req.query.ids;
    console.log('query ids', ids);
    const allIds = ids.split(',').map(id => {
        if(id.match(/^[0-9a-fA-F]{24}$/))
            return mongoose.Types.ObjectId(id);
        else {
            console.log('id is not valid', id);
        }
    });
    const condition = {_id: {$in : allIds}};
    News.deleteMany(condition, (err, result) => {
        if(err) return res.status(404).json(err);
        res.status(202).json(result);
    });
});

router.put('/News/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;
    const conditions = { _id: id};
    const news = {...req.body, image: lastUploadedImageName};
    const update = { $set: news };
    const options = {
        upsert: true,
        new: true
    };
    News.findOneAndUpdate(conditions, update, options, (err, response) => {
        if(err) return res.status(500).json({ msg: 'update failed', error: err });
        res.status(200).json({ msg: `document with id ${id} updated`, response: response });
    });
});

module.exports = router;


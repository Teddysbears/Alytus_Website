const express = require('express');
const router = express.Router();
const News = require('../models/new');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const nodemailer = require('nodemailer');
const Keyword = require('../models/keyword');


router.get('', (req,res) => {
   res.status(200).json({msg: 'homepage'});
});

router.get('/ping', (req, res) => {
    res.status(200).json({ msg: 'pong', date: new Date()});
});

router.get('/news',(req, res) => {
    News.find()
        .sort({'createdOn': -1})
        .exec()
        .then(news => res.status(200).json(news))
        .catch(err => res.status(500).json({
            message: 'news not found', err: err
        }));
});


router.get('/news/:id', (req,res) => {
    const id = req.params.id;
    News.findById(id)
        .then(New => res.status(200).json(New))
        .catch(err => res.status(404).json({
            message:`New with id : ${id} not found`, err: err
        }));
});

router.get('/keywords', (req, res) => {
   Keyword.find()
       .sort({count:-1})
       .exec()
       .then(keyword => res.status(200).json(keyword))
       .catch(err => res.status(404).json({
           mlg:'error keyword get', err: err
       }));
});

router.post('/news', (req,res)=> {
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

router.post('/sendmail', (req,res) => {
    console.log("sendmail");
    let user = req.body;
    sendMail(user,info => {
        console.log(`email has been send ${info.accepted}`);
        res.send(info);
    });
});

async function sendMail(user, callback){
    console.log(user);
    // Generate test SMTP service account from ethereal.email
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    });
    console.log(user.email);

    let mailOptions = {
        from: user.email, // sender address
        to: "hpf5mq+2l5aikjq0z7tw@sharklasers.com", // list of receivers
        subject: user.subject, // Subject line
        text: user.content, // plain text body
        html: "<b>Hello world?</b>" // html body
    };

    let info = await transporter.sendMail(mailOptions);
    callback(info);
}

router.post('/keywords', (req, res) => {
    const keyword = new Keyword(req.body);
    keyword.save((error, Keyword) => {
        if (error) return res.status(500);
        res.status(201).json(Keyword);
    })
});


let lastUploadedImageName = '';


router.delete('/news/:id', (req,res) => {
    const id = req.params.id;
    News.findByIdAndDelete(id, (err,news) => {
        if(err) return res.status(404).json(err);
        if(!news) return res.status(404).json({message: `news with ${id} not found`});
        res.status(202).json({message: `news with id : ${news._id} has been deleted with success`});
    });
});

router.delete('/news', (req,res) => {
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



router.put('/news/:id', upload.single('image'), (req, res) => {
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

router.put('/keywords/:word', (req,res) => {
    const word = req.param.word;
    const conditions = { word: word};
    const keyword = {...req.body};
    const update = { $set: keyword};
    const options = {
        upsert: true,
        keyword: true,
        useFindAndModify: false,
    };
    Keyword.findOneAndUpdate(conditions, update, options, (err, response) => {
        if(err) return res.status(500).json({ msg: 'update keyword failed', error: err});
        res.status(200).json({ msg: `keyword ${word} updated`, response: response});
    });
});

module.exports = router;


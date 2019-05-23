const express = require('express');
const router = express.Router();
const News = require('../models/new');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const nodemailer = require('nodemailer');



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

router.post('/sendmail', (req,res) => {
    console.log("sendmail");
    let user = req.body;
    sendMail(user,info => {
       console.log(`email has been send ${info.message}`);
        res.send(info);
    });
});

async function sendMail(user, callback){
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

    let mailOptions = {
        from: '"TestMail👻" <foo@example.com>', // sender address
        to: user.email, // list of receivers
        subject: user.subject, // Subject line
        text: user.content, // plain text body
        html: "<b>Hello world?</b>" // html body
    };

    let info = await transporter.sendMail(mailOptions);
    callback(info);
}

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


const express = require('express');
const router = express.Router();
const News = require('../models/new');

router.get('', (req,res) => {
   res.status(200).json({msg: 'homepage'});
});

router.get('/ping', (req, res) => {
    res.status(200).json({ msg: 'pong', date: new Date()});
});

router.post('/News', (req,res)=> {
    const New = new News(req.body);
    New.save((err, News) =>{
        if(err) return res.status(500).json(err);
        res.status(201).json(News);
    });
});

module.exports = router;


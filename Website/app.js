const express = require('express');
const app = express();
const api = require('./api/v1/index');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connection = mongoose.connection;


app.set('port',(process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({origin: "*"}));


const uploadDir = require('path').join(__dirname,'/uploads');
console.log('uploadDir', uploadDir);
app.use(express.static(uploadDir));

app.use('',api);

app.use((req,res) => {
    const error = new Error("404 Not Found nous");
    error.status = 404;
    res.json({msg: "404 Not Found nous", err: error});
});

mongoose.connect('mongodb://localhost:27017/News', {useNewUrlParser : true});
connection.on('error', (err)=>{
    console.error(`Connection to MongoDB failed ${err.message}`)
});

connection.once('open', ()=> {
    console.log('Connected MongoDB');

    app.listen(app.get('port'), ()=> {
        console.log(`express server listening on port ${app.get('port')}`);
    });
});

const parser = require('./conditionnalParsing');
const event = require('events');
const moment = require('moment');

let laikasDate = '2019-06-03T13:02:13.519Z';
let pliusDate = '2019-06-03T13:02:13.519Z';

let changelaikasDate = (date) => {
    laikasDate=date;
};
let changepliusDate = (date) => {
    console.log("date change");
    pliusDate=date;
};

module.exports.changepliusDate = changepliusDate;
module.exports.changelaikasDate = changelaikasDate;

let ee = new event.EventEmitter();

ee.on('newlaikas', changelaikasDate);
ee.on('newplius', changepliusDate);

let out = (str) => {
    console.log(str);
};

setInterval( () => {
    //console.log(pliusDate);
    parser.getFeed('http://www.alytusplius.lt/rss.xml',pliusDate, pliusDate, ee, out);
    },1000);

setInterval(() => {
    //console.log(laikasDate);
    parser.getFeed('http://www.alytauslaikas.lt/feed/',laikasDate, laikasDate,ee, out);
    },10000);

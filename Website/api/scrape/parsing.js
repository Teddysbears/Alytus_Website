const parser = require ('./conditionnalParsing.js');
const event = require('events');
require('longjohn').async_trace_limit = -1;

let laikasDate = '2019-05-24T07:01:22.000Z';
let pliusDate = '2019-05-27T16:45:26.000Z';

let changelaikasDate = (date) => {
    laikasDate=date;
};
let changepliusDate = (date) => {
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
    },500);

setInterval(() => {
    //console.log(laikasDate);
    parser.getFeed('http://www.alytauslaikas.lt/feed/',laikasDate, laikasDate,ee, out);
    },10000);




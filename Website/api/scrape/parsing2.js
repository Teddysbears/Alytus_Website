const parser = require('./conditionnalParsing');
const event = require('events');
const moment = require('moment');

/*
let laikasDate = moment().format('YYYY-MM-DDThh:mm:ss.SSS')+'Z';
let pliusDate = moment().format('YYYY-MM-DDThh:mm:ss.SSS')+'Z';
*/

let pliusDate = '2019-04-30T00:00:00.000Z';

let changelaikasDate = (date) => {
    laikasDate=date;};
let changepliusDate = (date) => {
    pliusDate=date;};

module.exports.changepliusDate = changepliusDate;
module.exports.changelaikasDate = changelaikasDate;

let ee = new event.EventEmitter();

ee.on('newplius', changepliusDate);

setInterval(async function() {
    await parser.getFeed('http://www.alytusplius.lt/rss.xml',pliusDate, pliusDate, ee);
},15000,(1));



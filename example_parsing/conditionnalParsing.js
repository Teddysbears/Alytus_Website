const altLaikasParsing = require('./altLaikasParsing');
const altPliusParsing = require('./altPliusParsing');
const moment = require('moment');
const parsing = require('./parsing');

const FeedParser = require('feedparser');
const request = require('request');

let feedparser = new FeedParser();

function getFeed(feedurl,lastModified, newDate, ee, out) {

    let checkrequest = request(feedurl);
    //console.log(lastModified);
    checkrequest.setHeader('if-modified-since',lastModified.toLowerCase());
    checkrequest.setHeader('maxredirects',1);

    let articles = [];

    checkrequest.once('response', async function (response) {
        //console.log('Sending check request.');
        if (response.statusCode === 304) {
            console.log("Error : nothing changed " + response.statusCode);
        } else {
            //console.log("Fetching data.");
           // console.log('i');
            let htmlgetrequest = request(feedurl);
            //this.removeAllListeners('response');

            htmlgetrequest.once('response', async function (response) {
                if (response.statusCode !== 200) {
                    //console.log('Error : failed to fetch data.');
                } else {
                    //console.log(response.statusCode);
                    //htmlgetrequest.removeAllListeners('response');
                    await this.pipe(feedparser);
                }
            });
        }
    });

    feedparser.once('readable', async function () {
        let meta = this.meta;
        let item;
        let current = {};


        while ((item = this.read())) {
            out(item.date);
            if (moment(item.date) > moment(lastModified)) {

                //console.log(item.date);
                if (moment(item.date) > moment(newDate)) {
                    if (feedurl==='http://www.alytauslaikas.lt/feed/'){
                        ee.emit('newlaikas', `${moment(item.date).format('YYYY-MM-DDThh:mm:ss:SSS')}Z`);
                        ee.removeListener('newlaikas', parsing.changelaikasDate);
                    } else {
                        ee.emit('newplius', `${moment(item.date).format('YYYY-MM-DDThh:mm:ss:SSS')}Z`);
                        ee.removeListener('newplius', parsing.changepliusDate);
                    }
                }

                if (feedurl === 'http://www.alytauslaikas.lt/feed/') {
                    out('laikas recorded\n');
                    current  = await altLaikasParsing.laikasData(item.link);
                    //console.log('laikasnews' + item.date);
                } else if (feedurl === 'http://www.alytusplius.lt/rss.xml') {
                    out('plius recorded\n');
                    current  = await altPliusParsing.pliusData(item.link);
                    //console.log('pliusnews' + item.date);
                } else console.log('bad feed address, please check');
                articles.push(current );
                //console.log(current );
            }
        }
        //console.log(articles);

    });
}


//getFeed('http://www.alytauslaikas.lt/feed/');
//getFeed('http://www.alytusplius.lt/rss.xml');

module.exports.getFeed = getFeed;









/*
feedparser.once('readable', async function ()  {
    let stream = this;
    let meta = this.meta;
    let item;
    let articles = [];
    let jambon = {};

    while( (item = stream.read())){
        //console.log(item.link);

        jambon = await altLaikasParsing.laikasData(item.link);
        console.log(jambon);

    }
    //console.log(articles);
    return articles;
});
*/

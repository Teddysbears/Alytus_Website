const altLaikasParsing = require('./altLaikasParsing');
const altPliusParsing = require('./altPliusParsing');
const moment = require('moment');
const parsing = require('./parsing');

const FeedParser = require('feedparser');
const request = require('request');

let feedparser = new FeedParser();


async function getFeed(feedurl,lastModified, newDate, ee) {

    let checkrequest = request(feedurl);
    //console.log(lastModified);
    checkrequest.setHeader('if-modified-since',lastModified.toLowerCase());
    checkrequest.setHeader('maxredirects',1);

    let htmlgetrequest = request(feedurl);

    let articles = [];


    await checkrequest.once('response', async function (response) {
        if (response.statusCode === 304) {
            console.log("Error : nothing changed " + response.statusCode);
        } else {
            console.log('SQUALALA' + '\n\n\n');
            await htmlgetrequest.once('response', async function(response) {
                if (response.statusCode !== 200) {
                } else {
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

            //out(item.date);
            if (moment(item.date) > moment(lastModified)) {

                //console.log(item.date);
                if (moment(item.date) > moment(newDate)) {
                    if (feedurl==='http://www.alytauslaikas.lt/feed/') {
                        ee.emit('newlaikas', `${moment(item.date).format('YYYY-MM-DDThh:mm:ss:SSS')}Z`);
                    } else {
                        ee.emit('newplius', `${moment(item.date).format('YYYY-MM-DDThh:mm:ss:SSS')}Z`);

                    }
                }

                if (feedurl === 'http://www.alytauslaikas.lt/feed/') {
                    //out('laikas recorded\n');
                    current  = await altLaikasParsing.laikasData(item.link);
                    //console.log('laikasnews' + item.date);
                } else if (feedurl === 'http://www.alytusplius.lt/rss.xml') {
                    //out('plius recorded\n');
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

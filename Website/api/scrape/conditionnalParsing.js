const altLaikasParsing = require('./altLaikasParsing');
const altPliusParsing = require('./altPliusParsing');
const moment = require('moment');
const axios = require ('axios');
const FeedParser = require('feedparser');
const request = require('request');

let feedparser = new FeedParser();


async function getFeed(feedurl,lastModified, newDate, ee) {

    let feedcheckrequest = request(feedurl);
    feedcheckrequest.setHeader('if-modified-since',lastModified.toLowerCase());
    let feedgetrequest = request(feedurl);

    await feedcheckrequest.once('response', async function (response) {
        if (response.statusCode === 304) {
            console.log(`Error : nothing changed ${response.statusCode}`);
        } else {
            await feedgetrequest.once('response', async function(response) {
                if (response.statusCode !== 200) {
                    console.log(`Error : feed not found ${response.statusCode}`);
                } else {
                    await this.pipe(feedparser);
                }
            });
        }
    });


    feedparser.once('readable', async function () {

        let item;
        while ((item = this.read())) {

            if (moment(item.date) > moment(lastModified)) {

                if (moment(item.date) > moment(newDate)) {

                    if (feedurl==='http://www.alytauslaikas.lt/feed/') {
                        ee.emit('newlaikas', `${moment(item.date).format('YYYY-MM-DDThh:mm:ss:SSS')}Z`);
                    } else {
                        ee.emit('newplius', `${moment(item.date).format('YYYY-MM-DDThh:mm:ss:SSS')}Z`);
                    }
                }

                if (feedurl === 'http://www.alytauslaikas.lt/feed/') {
                     await axios.post('http://localhost:3000/news', await altLaikasParsing.laikasData(item.link))
                         .then(data => console.log(data))
                         .catch(err => console.log(err)
                         );
                     //await altLaikasParsing.laikasData(item.link);
                } else if (feedurl === 'http://www.alytusplius.lt/rss.xml') {
                     await axios.post('http://localhost:3000/news', await altPliusParsing.pliusData(item.link))
                         .then(data => console.log(data))
                         .catch(err => console.log(err)
                         );

                } else console.log('bad feed address, please check');

            }
        }
    });
}


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

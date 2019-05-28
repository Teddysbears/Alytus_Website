const altLaikasParsing = require('./altLaikasParsing');
const FeedParser = require('feedparser');
const request = require('request'); // for fetching the feed

let lastModified = 'Thu, 15 May 2019 06:31:18 GMT';
let req = request('http://www.alytauslaikas.lt/feed/');
//'http://www.alytusplius.lt/rss.xml'
//'http://www.alytauslaikas.lt/feed/'
let feedparser = new FeedParser();

req.on('error', function (error) {
    console.log('erreur requete');
});

req.on('response', function (res) {
    let stream = this; // `this` is `req`, which is a stream

    if (res.statusCode !== 200) {
        this.emit('error', new Error('Bad status code'));
    } else
        if (res.headers["last-modified"]!==lastModified) {
            stream.pipe(feedparser);
    } else {
        console.log("Nothing new");
    }
});

feedparser.on('error', function (error) {
    console.log(error.message);
});

feedparser.on('readable', async function () {

    // This is where the action is!
    let stream = this; // `this` is `feedparser`, which is a stream
    let meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
    let item;
    let result = [];

    while ((item = stream.read())) {
        console.log(item.link);
        result.push(await altLaikasParsing.laikasData(item.link));
    }
    console.log(result[0]);
});


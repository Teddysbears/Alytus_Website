const axios = require('axios');
const cheerio = require('cheerio');
const News = require('../models/new');
const download = require('image-downloader');


let getData = html => {
    let news = new News ();
    let indicator = 0;
    const $ = cheerio.load(html);
    //$('*').html().replace('', "&shy");


    let str;
    $('.entry-content *').each((i, elem) => {
        str = $(elem).text();
        switch (elem.name) {

            case 'p' :

                if (!(str === '\n' || str === '\n\t \n' || str === undefined || str === null || str === '')) {
                    news.contents.push({id: indicator, cont: str});
                    str = "";
                    indicator++;
                }
                break;

            case 'li' :
                if (!(str === '\n' || str === '\n\t \n' || str === undefined || str === null || str === '')) {
                    news.contents.push({id: indicator, cont: str});
                    str = "";
                    indicator ++;
                }
                break;

            case 'h2' :
                news.subTitles.push({id: indicator, sub: str});
                indicator++;
                break;

            case 'img' :
                let url = $(elem).attr('src');
                let name = $(elem).attr('alt');
                if(url.charAt(0) === '/') url = 'http://alytauslaikas.lt/' + url;
                const options = {
                    url: url,
                    dest: '../../uploads'
                };
                url = url.split('/')[7];

                news.images.push({
                    id:indicator,
                    name:name,
                    url: url
                });

                download.image(options)
                    .then(({ filename }) => {
                        //console.log(filename);
                        //console.log(news.images[0].url);
                    }).catch((err) => {
                    //console.log('\n\n' + err + '\n\n');
                });
                //console.log('img : ' + $(elem).attr('alt'));
                indicator++;
                break;
        }
    });
    let title = $('.entry-title').text();
    news.title = title;

    news.writer = 'Unknown';

    let actualdate = $('.entry-date.published').text();
    news.date=actualdate;

    news.map = false;

    news.coordinates = [0, 0];

    return news;
};

async function laikasData (url) {
    let html;
    await axios.get(url).then( (res) => {
        html = res.data;
    });
    return getData(html);
}

module.exports.laikasData = laikasData;


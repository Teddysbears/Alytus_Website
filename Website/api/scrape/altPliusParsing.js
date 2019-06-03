const axios = require('axios');
const cheerio = require('cheerio');
const News = require('../models/new');
const download = require('image-downloader');
// const FormData = require('form-data');
// const Jimp =  require('jimp');
// const fs = require('fs');

let getData = html => {
    let news = new News();
    let indicator = 0;
    const $ = cheerio.load(html);
    news.images ={ id: indicator,name:$('.views-field span div div a img').attr('alt') +
            $('.views-field span div div a img').attr('title'), url:$('.views-field span div div a img').attr('src')};
    const options = {
        url: news.images[0].url,
        dest: '../../uploads'
    };
    let urlOk = news.images[0].url.split('/');
    let urlmesburnes = urlOk[9].split('?');
    news.images[0].url = urlmesburnes[0];
    download.image(options)
        .then(({ filename}) => {
            console.log(filename);
            news.images[0].url =filename.substring(8);
        }).catch((err) => {
        console.log(err);
    });


    indicator++;
    let str;
    $('.body p strong, .body  p:not(strong), .body p img').each((i, elem) => {
        str = ($(elem).text());
        switch (elem.name) {

            case 'strong' :

                if (! (str==='\n' || str==='\n\t \n' || str===undefined || str===null || str===' ' || str==='\t')) {
                    if (elem.childElementCount !== 0 && str !== "" && str.length !== 1) {
                        news.subTitles.push({id: indicator, sub: str});
                        indicator++;
                    }
                }
                break;

            case 'p' :

                if (! (str==='\n' || str==='\n\t \n' || str===undefined || str===null || str===' ' || str==='\t')) {
                    if (elem.childElementCount !== 0 && str !== "") {
                        let sub = str.substring(2,str.length-1);
                        if(sub !== " " && sub.length !== 1) {
                            news.contents.push({id: indicator, cont: sub});
                            str = "";
                            indicator++;
                        }
                    }
                }
                break;


            case 'img' :
                let url = $(elem).attr('src');
                let name = $(elem).attr('alt');
                if(url.charAt(0) === '/') url = 'https://alytusplius.lt' + url;
                const options = {
                    url: url,
                    dest: 'uploads'
                };
                news.images.push({
                    id:indicator,
                    name:name,
                    // don't forget to change this -->
                    url:url.replace('https://alytusplius.lt/sites/default/files/images2019/','')
                });

                download.image(options)
                    .then(({ filename}) => {
                        console.log(filename);
                    }).catch((err) => {
                    console.log(err);
                });
                indicator++;
                break;
        }
    });
    let cleanTitle = $('.views-field-title').text();
    news.title = cleanTitle.substring(8,cleanTitle.length-4);
    let splitString = $('.post').text().split('•');
    news.writer = splitString[0];
    let date = splitString[2].split(',');
    news.date = date[1].substring(1);
    news.map = false;
    news.coordinates = [];
    return news;
};

async function pliusData (url) {
    let html;
    await axios.get(url).then( (res) => {
        html = res.data;
    });
    return getData(html);
}

module.exports.pliusData = pliusData;


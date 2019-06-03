const axios = require('axios');
const cheerio = require('cheerio');
const News = require('../models/new');
const download = require('image-downloader');


let getData = html => {
    let news = new News ();
    let indicator = 0;
    const $ = cheerio.load(html);
    $('*').html().replace('', "&shy");


    let str;
    $('.entry-content *').each((i, elem) => {
        str = $(elem).text();
        switch (elem.name) {

            case 'p' :

                if (!(str === '\n' || str === '\n\t \n' || str === undefined || str === null || str === '')) {
                    //dataparsed[3].push({id: indicator, text: str});
                    news.contents.push({id: indicator, cont: str});
                    //console.log('content : '+str);
                    str = "";
                    indicator++;
                }
                break;

            case 'li' :
                if (!(str === '\n' || str === '\n\t \n' || str === undefined || str === null || str === '')) {
                    //dataparsed[3].push({id: indicator, text: str});
                    news.contents.push({id: indicator, cont: str});
                    //console.log('list and content : '+str);
                    str = "";
                    indicator ++;
                }
                break;

            case 'h2' :
                //dataparsed[2].push({id: indicator, text: str});
                news.subTitles.push({id: indicator, sub: str});
                //console.log('subtitle : '+str);
                indicator++;
                break;

            case 'img' :
                //dataparsed[4].push({id: indicator, alt: $(elem).attr('alt'), src: $(elem).attr('src')});
                let url = $(elem).attr('src');
                let name = $(elem).attr('alt');
                if(url.charAt(0) === '/') url = 'http://alytauslaikas.lt/' + url;
                const options = {
                    url: url,
                    dest: 'uploads'
                };
                news.images.push({
                    id:indicator,
                    name:name,
                    url:url.replace('http://alytauslaikas.lt/wp-content/uploads/2019/06/','')
                });
                //console.log(url);

                download.image(options)
                    .then(({ filename }) => {
                        console.log(filename);
                        console.log(news.images[0].url);
                    }).catch((err) => {
                    console.log(err);
                });
                console.log('img : ' + $(elem).attr('alt'));
                indicator++;
                break;
        }
    });

    news.tile =$('.entry-title').text();
    //let splitString = $('.post').text().split('•');

    news.writer = 'Unknown';
    //splitString[0];
    //let date = //splitString[2].split(',');

    news.date =$('.entry-date.published').text();
    news.map = false;
    news.coordinates = [];
    console.log(news);
    return news;

    //dataparsed[0] = $('.entry-title').text().replace('', '').replace('\n', '').replace('\t', '');
    //dataparsed[1] = $('.entry-date.published').text();
    //dataparsed[5] = 'No writers Check';
    //dataparsed[6] = 'No map Check';
    //dataparsed[7] = 'No Keyword Check';
    //dataparsed[8] = 'No Coordinates';
    return 0 ;//dataparsed;
};


async function laikasData (url) {
    let html;
    await axios.get(url).then( (res) => {
        html = res.data;
        //console.log(html)
    });
    return getData(html);
}

module.exports.laikasData = laikasData;

async function test (url) {
    console.log('Process Running\n');
    let html;
    await axios.get(url).then( (res) => {
        html = res.data;
        //console.log(html)
    });
    return getData(html);
}

test('http://www.alytauslaikas.lt/miesto-naujienos/alytaus-miesto-savivaldybe-perima-silumos-uki-i-savo-rankas/');


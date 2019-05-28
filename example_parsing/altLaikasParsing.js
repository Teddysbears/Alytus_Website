const axios = require('axios/index');
const cheerio = require('cheerio');

let getData = html => {
    let dataparsed = [];

    dataparsed[2] = [];
    dataparsed[3] = [];
    dataparsed[4] = [];
    let indicator = 0;
    const $ = cheerio.load(html);
    $('*').html().replace('', "&shy");
    let str;
    $('.entry-content *').each((i, elem) => {
        str = $(elem).text();
        switch (elem.name) {

            case 'p' :

                if (!(str === '\n' || str === '\n\t \n' || str === undefined || str === null || str === '')) {
                    dataparsed[3].push({id: indicator, text: str});
                    str = "";
                    indicator++;
                }
                break;

            case 'li' :
                if (!(str === '\n' || str === '\n\t \n' || str === undefined || str === null || str === '')) {
                    dataparsed[3].push({id: indicator, text: str});
                    str = "";
                    indicator ++;
                }
                break;

            case 'h2' :
                dataparsed[2].push({id: indicator, text: str});
                indicator++;
                break;

            case 'img' :
                dataparsed[4].push({id: indicator, alt: $(elem).attr('alt'), src: $(elem).attr('src')});
                indicator++;
                break;
        }
    });


    dataparsed[0] = $('.entry-title').text().replace('', '').replace('\n', '').replace('\t', '');
    dataparsed[1] = $('.entry-date.published').text();
    dataparsed[5] = 'No writers Check';
    dataparsed[6] = 'No map Check';
    dataparsed[7] = 'No Kayword Check';
    dataparsed[8] = 'No Coordinates';
    return dataparsed;
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

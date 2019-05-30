const axios = require('axios');
const cheerio = require('cheerio');

let getData = html => {
    let data = [];
    data[2]=[];
    data[3]=[];
    data[4]=[];
    let indicator = 0;
    const $ = cheerio.load(html);
    data[4][0]={ id:indicator,alt:$('.views-field span div div a img').attr('alt') + $('.views-field span div div a img').attr('title'), src:$('.views-field span div div a img').attr('src')};
    indicator++;
    let str;
    $('.body p, body p strong, .body p img').each((i, elem) => {
        str = ($(elem).text().substring(2, $(elem).text().length-1));
        switch (elem.name) {

            case 'p' :

                if (! (str==='\n' || str==='\n\t \n' || str===undefined || str===null || str===' '))
                    if (elem.childElementCount !==0 && str !=="") {
                        data[3].push({id:indicator, text:str});
                        str = "";
                        indicator++;
                    }
                    break;
            case 'strong' :
                data[2].push({id:indicator, text:str});
                indicator++;
                break;

            case 'img' :
                data[4].push({
                    id:indicator,alt:$(elem).attr('alt') + $(elem).attr('title'),
                    src:$(elem).attr('src')
                });
                indicator++;
                break;
        }
    });

    data[0]=$('.views-field-title').text();
    data[1]=$('.post').text();
    data[5]='No writers Check';
    data[6]='No map Check';
    data[7]='No Keyword Check';
    data[8]='No Coordinates';
    return data;
};

async function pliusData (url) {
    let html;
    await axios.get(url).then( (res) => {
        html = res.data;
        //console.log(html)
    });
    return getData(html);
}

module.exports.pliusData = pliusData;

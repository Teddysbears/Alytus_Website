const axios = require('axios/index');
const cheerio = require('cheerio');

const url = 'https://www.alytausnaujienos.lt/zmo-gaus-ga-li-my-biu-ri-bas-ati-li-nes-vid-man-tas-ur-bo-nas-mo-ko-svar-biau-sio-da-ly-ko-vi-sa-da';


let getData = html => {
    let data = [];
    data[2]=[];
    data[3]=[];
    data[4]=[];
    let indicator = 0;
    const $ = cheerio.load(html);
    $('*').html().replace(/(\&shy;|­|&#173;)/gi, "");
    let str;
    $('.container.stra-body *').each((i, elem) => {
        str = $(elem).text().replace('','').replace('/&#173/g','').replace('\n','');
        switch (elem.name) {

            case 'p' :

                if (!(str === '\n' || str === '\n\t \n' || str === undefined || str === null || str === ' ')) {
                    data[3].push({id: indicator, text: str.replace(/[\u00AD\u002D\u2011]+/g,'')});
                    str = "";
                    indicator++;
                }

                break;

            case 'div' :
                data[2].push({id:indicator, text:str.replace(/[\u00AD\u002D\u2011]+/g,'').replace(/\n/g,'')});
                indicator++;
                break;

            case 'img' :
                data[4].push({id: indicator, alt: $(elem).attr('alt'), src: $(elem).attr('src')});
                indicator++;
                break;
        }
    });

    data[0]=$('.str-title span').text().replace('','').replace(/[\u00AD\u002D\u2011]+/g,'');
    data[1]=$('.data').text();
    data[5]='No writers Check';
    data[6]='No map Check';
    data[7]='No keyword Check';
    return data;
};


axios.get(url)
    .then( response => {
        data = getData(response.data);
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });

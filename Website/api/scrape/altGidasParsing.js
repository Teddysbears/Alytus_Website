const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://alytausgidas.lt/naujiena/27802-atkreipe-demesi-i-vairavimo-isgerus-problema';


let getData = html => {
    let data = [];
    data[2]=[];
    data[3]=[];
    data[4]=[];
    let indicator = 0;
    const $ = cheerio.load(html);
    data[4][0]={ id:indicator, alt:$('.nft :first-child').attr('alt'), src:$('.nft :first-child').attr('src')};
    indicator ++;
    let str;
    $('.nls *').each((i, elem) => {
        str = $(elem).text();
        switch (elem.name) {

            case 'p' :

                if (!(str === '\n' || str === '\n\t \n' || str === undefined || str === null || str === ' ')) {
                    data[3].push({id: indicator, text: str});
                    str = "";
                    indicator++;
                }

                break;
            case 'h2' :
                data[2].push({id: indicator, text: str});
                indicator++;
                break;

            case 'img' :
                data[4].push({id: indicator, alt: $(elem).attr('alt'), src: $(elem).attr('src')});
                indicator++;
                break;
        }
    });

    data[0]=$('h1').text();
    data[1]=$('.data').text();
    data[5]='No writers Check';
    data[6]='No map Check';
    data[7]='No Kayword Check';
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


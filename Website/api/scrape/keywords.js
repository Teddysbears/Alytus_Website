const Occurences = require('occurences');
const axios = require('axios');
const cheerio = require('cheerio');
const Keyword = require('../models/keyword');
const translate = require('translate');
translate.engine = 'yandex';
translate.key = 'trnsl.1.1.20190607T060759Z.7d74b186b6bb5e3c.21515b5b03794948de2ed88d20c8e320c6dd4759';

let urls = [
    'https://alytusplius.lt/naujienos/kovoje-del-vandens-motociklu-naujas-rajono-politiku-sprendimas',
    'https://alytusplius.lt/naujienos/policijos-pareigunams-prie-audi-vairo-ikliuvo-neblaivus-kolega',
    'https://alytusplius.lt/naujienos/alytaus-kredito-unijai-15-metu-aukso-puoda-pajininkai-patys-sunese',
    'https://alytusplius.lt/naujienos/tragiska-vasaros-pradzia-alytuje-tvenkinyje-nuskendo-nepilnametis',
    'https://alytusplius.lt/naujienos/alytiskio-statomas-namas-isgasdino-kaimynus-bus-sarvojimo-sale',
    'https://alytusplius.lt/naujienos/pirmoji-alytaus-mero-uzsienio-komandiruote-i-tolimaja-kinija',
    'https://alytusplius.lt/naujienos/nori-vasara-padirbeti-alytuje-pasinaudok-siuloma-galimybe',
    'https://alytusplius.lt/naujienos/savivaldybe-parduoda-autobusa-keturis-pianinus-ir-automobili',
    'https://alytusplius.lt/naujienos/policijos-pareigunams-prie-audi-vairo-ikliuvo-neblaivus-kolega',
    'https://alytusplius.lt/naujienos/alytuje-gadinamos-telefonspynes-chuliganu-jau-iesko-policija',
    'https://alytusplius.lt/naujienos/kaime-liepsnoja-ukiniai-pastatai-ugnis-kesinasi-ir-i-gyvenamaji-nama',
    'https://alytusplius.lt/naujienos/po-susidurimo-su-automobiliu-motociklininkas-atsidure-reanimacijoje',
    'https://alytusplius.lt/naujienos/nesmagi-patirtis-banke-del-vieno-euro-keturiasdesimt-centu',
    'https://alytusplius.lt/naujienos/r-markauskas-metas-istoriniam-teisingumui-ir-dainavos-savivaldybei',
    'https://alytusplius.lt/naujienos/r-jankauskas-valdzia-nuo-dievo-tik-patiems-teko-ja-issirinkti',
    'https://alytusplius.lt/naujienos/tele2-pristato-nauja-ismanuji-fonos-isigysite-pigiau-ir-gausite-dovanu',
    'https://alytusplius.lt/naujienos/jurgio-turgeliai-tevo-dienai-bijunai-jaunavedziu-guoliui-jazminai',
    'https://alytusplius.lt/naujienos/alytaus-kredito-unijai-15-metu-aukso-puoda-pajininkai-patys-sunese',
    'https://alytusplius.lt/naujienos/i-alytaus-miesto-kulturos-premijas-pretenduoja-desimt-kandidatu',
    'https://alytusplius.lt/naujienos/solidzios-apimties-kulturos-zurnalas-pristatytas-ir-alytuje',
    'https://alytusplius.lt/naujienos/didziausius-tabu-kureja-lauzo-atvirumu-pristato-monospektakli-kitokia',
    'https://alytusplius.lt/naujienos/daugiausia-alytaus-rajono-abiturientu-laike-anglu-kalbos-egzamina',
    'https://alytusplius.lt/naujienos/miesto-svietimo-vaira-i-savo-rankas-ima-atgal-sugrizes-v-valunas',
    'https://alytusplius.lt/naujienos/zuvinto-biosferos-rezervate-pirmokus-suzavejo-perkuno-ozelis',
    'https://alytusplius.lt/naujienos/pries-vasaros-atostogas-svarbi-zinia-moksleiviams-apie-mokescius',
    'http://www.alytauslaikas.lt/miesto-naujienos/sodra-primena-svarbiausius-pensiju-kaupimo-pokycius/',
    'http://www.alytauslaikas.lt/miesto-naujienos/seminaras-gyventojams-alytuje/',
    'http://www.alytauslaikas.lt/miesto-naujienos/raidos-ar-sveikatos-sutrikimu-turintiems-vaikams-bus-paprasciau-gauti-ismokas/',
    'http://www.alytauslaikas.lt/miesto-naujienos/neuzkibkite-ant-sukciaujanciu-asmenu-kabliuko/',
    'http://www.alytauslaikas.lt/miesto-naujienos/vtek-informuoja/',
    'http://www.alytauslaikas.lt/miesto-naujienos/keisti-mainai-tarp-alytaus-ir-lazdiju/',
    'http://www.alytauslaikas.lt/miesto-naujienos/i-alytaus-miesto-savivaldybes-kulturos-premijas-pretenduoja-10-kandidatu/',
    'http://www.alytauslaikas.lt/miesto-naujienos/pries-atostogas-svarbi-zinia-moksleiviams-apie-mokescius/',
    'http://www.alytauslaikas.lt/miesto-naujienos/41922/',
    'http://www.alytauslaikas.lt/miesto-naujienos/saule-megaukimes-saugiai-kaip-pasirinkti-tinkamas-apsaugos-priemones/',
    'http://www.alytauslaikas.lt/miesto-naujienos/alytiskiu-iniciatyvos-ar-alytuje-bus-irengti-alytus-myliu-miesto-vartai/',
    'http://www.alytauslaikas.lt/miesto-naujienos/ir-kas-sake-kad-seni-laikai-negris/',
    'http://www.alytauslaikas.lt/miesto-naujienos/valstybinis-studiju-fondas-laukia-prasymu/',
    'http://www.alytauslaikas.lt/miesto-naujienos/meras-n-cesiulis-su-palyda-dzukijos-sostine-pristatys-kinijoje/',
    'http://www.alytauslaikas.lt/miesto-naujienos/baigiama-asfaltuoti-jurates-gatve/',
    'http://www.alytauslaikas.lt/miesto-naujienos/sazine-kur-tu/',
    'http://www.alytauslaikas.lt/miesto-naujienos/solidzios-apimties-kulturos-zurnalas-pristatytas-ir-dzukijos-sostineje/',
    'http://www.alytauslaikas.lt/miesto-naujienos/gabiu-zmoniu-miestas/',
    'http://www.alytauslaikas.lt/miesto-naujienos/minima-pasauline-diena-be-tabako/',
    'http://www.alytauslaikas.lt/miesto-naujienos/alytaus-karjere-lankesi-rasytojas-benediktas-gylys/',
    'http://www.alytauslaikas.lt/miesto-naujienos/draugyste-su-hiracukos-miestu-tesiasi/',
    'http://www.alytauslaikas.lt/miesto-naujienos/augancios-ekonomikos-vaisius-skina-ne-tik-dirbantieji-bet-ir-pensininkai/',
    'http://www.alytauslaikas.lt/miesto-naujienos/kino-teatro-dainava-repertuaras-8/',
    'http://www.alytauslaikas.lt/miesto-naujienos/lietuva-ruosiasi-visapusiskai-priimti-griztancius-ir-atvykstancius-vaikus/',
    'http://www.alytauslaikas.lt/miesto-naujienos/savivaldybe-palaiko-gyventojus-ir-siekia-uzdrausti-vandens-motociklu-plaukiojima-didziulio-ezere/',
    'https://www.alytausnaujienos.lt/ne-no-ri-me-ko-mer-ci-nio-pa-sta-del-ka-bin-si-mes-prie-vis-ko',
    //'https://www.alytausnaujienos.lt/ter-ne-ti-nis-baz-ny-cios-siu-ly-mas-ne-vir-tu-lus-die-vas-ir-ne-lai-ki-ne-ben-druo-me-ne',
    //'https://www.alytausnaujienos.lt/daug-dis-ku-si-ju-su-ke-les-pa-sta-tas-mies-cen-tre-bus-auks-tu-ze-mes-nis-o-jo-fa-sa-das-svie-sus',
    //'https://www.alytausnaujienos.lt/zalio-ji-gat-ve-vel-nu-ken-te-jo-nuo-liu-ties',
    //'https://www.alytausnaujienos.lt/sa-vi-val-dy-be-eme-si-tar-pi-nin-ko-vaid-mens-kaip-tie-su-bus-su-tur-gaus-pre-kiau-jais',
    //'https://www.alytausnaujienos.lt/sei-mo-na-riams-aly-tis-kiams-eu-ro-par-la-men-rin-ki-mai-bu-vo-ne-sek-min-gi',
    //'https://www.alytausnaujienos.lt/triuskinanti-gitano-nausedos-pergale-ir-dzukijoje',
    //'https://www.alytausnaujienos.lt/sun-kia-vai-kys-te-gy-ve-nu-si-aly-tis-ke-klyst-ke-liu-ma-ne-gel-be-jo-duk-ra',
    'https://www.alytausnaujienos.lt/so-di-nin-kai-sa-vo-sau-gu-mui-su-si-tvar-ke-fal-tuo-ke-lio-kel-kras-cius',
    'https://www.alytausnaujienos.lt/tiks-las-pa-tei-si-na-prie-mo-nes',
    'https://www.alytausnaujienos.lt/daug-dziaugs-mo-aly-tis-kems-mo-ciu-tems-su-tei-ku-si-ide-ja-ke-lia-vo-te-kan-cios-sau-les-sa-lies',
    'https://www.alytausnaujienos.lt/zemes-savininko-naudai-ketinama-naikinti-gatves-pavadinima',
    'https://www.alytausnaujienos.lt/daugu-ezeras-buti-ar-nebuti-vandens-motociklams',
    'https://www.alytausnaujienos.lt/kom-pa-ni-jo-je-blo-om-berg-dir-ban-tis-aly-tis-kis-triu-sia-net-atos-gas-kad-pa-au-ko-tu-lab-da',
    'https://www.alytausnaujienos.lt/vy-tau-tas-jast-rems-kas-ista-ty-mo-ne-pa-zei-de-da-nu-te-re-mei-kie-ne-pa-si-nau-do-jo-pa-rei-go',
    //'https://www.alytausnaujienos.lt/pasipiktine-naujomis-sar-vo-ji-mo-sa-lemis-gyventojai-ketina-vaziuoti-net-i-seima',
    'https://www.alytausnaujienos.lt/re-fe-ren-du-mai-vie-nam-ne-uz-te-ko-bal-su-ki-tas-ne-ivy-ko',
    'https://www.alytausnaujienos.lt/pre-zi-den-rin-ki-mai-lie-tu-vo-je-pir-mau-ja-gri-da-si-mo-ny-te-aly-taus-ap-skri-ties-sa-vi-val-dy',
    'https://www.alytausnaujienos.lt/baltic-petroleum-plecia-veikla-atidaro-jau-77-degaline-apsilankiusiu-laukia-staigmenos',
    'https://www.alytausnaujienos.lt/ne-lo-vas-stum-dy-ti-rei-kia',
    'https://www.alytausnaujienos.lt/ne-ti-ke-tos-do-va-nos-se-sioms-aly-taus-kras-ma-moms-lai-kas-sau-ir-ga-li-my-be-pa-si-jus-ti-mo-te',
    'https://www.alytausnaujienos.lt/siuks-li-na-mas-no-ru-nu-mis-kas-sa-vi-nin-ku-gal-vos-skaus-mas',
    //'https://www.alytausnaujienos.lt/nei-ro-tu-se-nei-sis-pro-jek-tuo-ja-mas-pa-sta-tas-sa-vai-me-ne-ra-blo-gi-ta-ciau-jie-sto-vi-ne-vie',
    'https://www.alytausnaujienos.lt/vai-ko-lu-po-mis-kal-ba-tie-sa',
    'https://www.alytausnaujienos.lt/sustabdyta-lietuvos-centro-partijos-pirmininko-naglio-puteikio-naryste-partijoje',
    'https://alytausgidas.lt/naujiena/27989-septynios-pensiju-kaupimo-naujoves',
    'https://alytausgidas.lt/naujiena/27988-alytaus-miesto-socialines-paramos-skyrius-tures-ieskoti-naujos-vedejos',
    'https://alytausgidas.lt/naujiena/27986-neblaivus-uz-vairo-sustabdytas-vyriausiasis-patrulis',
    'https://alytausgidas.lt/naujiena/27987-stovykla-vasara-be-telefonu-7-dienos-su-krepsiniu-sporto-stovyklu-sostineje-dauguose',
    'https://alytausgidas.lt/naujiena/27985-kulturos-premijai-siemet-pristatyti-ne-tik-kulturos-baru-atstovai',
    'https://alytausgidas.lt/naujiena/27984-ar-alytus-tures-naujus-miesto-vartus',
    'https://alytausgidas.lt/naujiena/27983-daugiausia-abiturientu-laike-anglu-kalbos-egzamina',
    'https://alytausgidas.lt/naujiena/27981-alytaus-ir-apylinkiu-vaizdai--pagal-z-bulgakova',
    'https://alytausgidas.lt/naujiena/27982-lkl-apdovanojimuose-skambejo-ir-alytaus-krepsinio-atstovu-pavardes',
    'https://alytausgidas.lt/naujiena/27979-alytaus-centre-iskilsiantis-pastatas-bus-zemesnis-ir-sviesus',
    'https://alytausgidas.lt/naujiena/27978-prasidejo-renginiai-skirti-alytuje-veikusios-aviaeskadriles-normandija-nemunas-jubiliejui',
    'https://alytausgidas.lt/naujiena/27976-registru-centras-nt-sandoriu-rinka-i-prieki-traukia-sklypai-alytuje-augo-butu-ir-namu-pardavimai',
    'https://alytausgidas.lt/naujiena/27977-r-sarknickas-po-klausimo-ministrui-imtasi-skubos',
    'https://alytausgidas.lt/naujiena/27975-v-valunas-pradejo-darba-alytaus-miesto-savivaldybeje',
    'https://alytausgidas.lt/naujiena/27988-alytaus-miesto-socialines-paramos-skyrius-tures-ieskoti-naujos-vedejos',
    'https://alytausgidas.lt/naujiena/27987-stovykla-vasara-be-telefonu-7-dienos-su-krepsiniu-sporto-stovyklu-sostineje-dauguose',
    'https://alytausgidas.lt/naujiena/27943-alytaus-pastininkai-automobiliu-negaus-gales-vaziuoti-elektriniu-dviraciu',
    'https://alytausgidas.lt/naujiena/27932-savivaldybe--uz-gyventojus-sieks-uzdrausti-vandens-motociklus-daugu-ezere',
    'https://alytausgidas.lt/naujiena/27913-abiturientai-dalyvavo-masiniuose-paskutinio-skambucio-sokiuose',
    'https://alytausgidas.lt/naujiena/27879-druskininku-kurortas-svencia-225-mecio-jubilieju',
    'https://alytausgidas.lt/naujiena/27897-kraujasiurbiu-masalu-naikinimo-preparatai--nemune',
    'https://alytausgidas.lt/naujiena/27893-iteikta-antroji-a-ramanausko-vanago-premija',
    'https://alytausgidas.lt/naujiena/27966-del-nesklandumu-marsrute-kautra-atsipraso-keleiviu-alytuje',
    'https://alytausgidas.lt/naujiena/27943-alytaus-pastininkai-automobiliu-negaus-gales-vaziuoti-elektriniu-dviraciu',
    'https://alytausgidas.lt/naujiena/27939-aplink-dainu-sleni-statyti-automobiliu-neleis-ves-nemokamas-transportas',
    'https://alytausgidas.lt/naujiena/28000-naujoji-gut-parduotuve-alytuje--pramones-g-12a',
    'https://alytausgidas.lt/naujiena/27993-alytuje-nedirbo-parduotuves-be-elektros-liko-apie-2-tukst-klientu',
    'https://alytausgidas.lt/naujiena/27969-alytaus-silumos-tinklus-miestui-grazinusi-litesko-gali-reikalauti-milijonu',
    'https://alytausgidas.lt/naujiena/27955-mokesciu-inspektoriai-tikrina-ar-prekiaujantieji-mesa-ir-jos-gaminiais-isduoda-kasos-cekius',
    'https://alytausgidas.lt/naujiena/27952-birstone-isgaunamas-vytautas-pristato-situacijas',
    'https://alytausgidas.lt/naujiena/27968-gadinamu-telefonspyniu-gamintojai-sokiruoti-gedimai-lietuvoje--vien-alytaus-mieste',
    'https://alytausgidas.lt/naujiena/27947-z-treigys-jazminu-g-3-paviljonas-uzdaromas-nebus-',
    'https://alytausgidas.lt/naujiena/27944-karjera-alytuje-aplanke-jaunasis-rasytojas-interneto-milijonierius',
    'https://alytausgidas.lt/naujiena/27888-alytuje-gaminamu-ledu-pirkejai-pripazino-plombyra-ir-vintaza'
]


let occ;

function getKeyword (url) {

    url.forEach(async (value) => {
        await axios.get(value)
            .then((response) => {
                occ = new Occurences(cheerio.load(response.data).text());
                occ.getSorted('desc').forEach(async (couple) => {
                    if (couple.number > 2) {
                        if (couple.value !== '' && -1 === couple.value.search(/\n|\t/g)) {
                            //console.log(couple.value);
                            let tmp = new Keyword();
                            tmp.word = couple.value;
                            tmp.count = couple.number;
                            tmp.trad = '';
                            translate(couple.value, {from: 'lt', to: 'en'})
                                .then((text) => {
                                    //console.log(text);
                                    tmp.trad = text;
                                    axios.post('http://localhost:3000/keywords', tmp)
                                        .then((data) => {
                                            //console.log(data);
                                        })
                                        .catch((error) => {
                                            console.log(error)
                                        });
                                })
                                .catch((error) => {
                                    console.log(error)
                                });
                            //console.log(tmp.word.search(/\n|\t/g));
                        }
                    }
                })
            })
            .catch((error) => {
                //console.log('\n\nERROR\n' + value + '\n\n');
                console.log(error);
            });
    })
}

getKeyword(urls);

const cheerio = require("cheerio");
const axios = require('axios');
const moment = require("moment");



const pages = [
    'pageno=01&marketId=0',
    'pageno=02&marketId=0',
    'pageno=03&marketId=0',
    'pageno=04&marketId=0',
    'pageno=05&marketId=0',
    'pageno=06&marketId=0',
    'pageno=07&marketId=0',
    'pageno=08&marketId=0',
    'pageno=09&marketId=0',
    'pageno=10&marketId=0',
    'pageno=11&marketId=0'
];
//const apiURL = 'https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&pageno=01&marketId=0';
const apiURL = 'https://www.argaam.com/en/company/companypreviousyeardividendfilterresult?companyID=0&year=2017&sectorID=0&argaamsectorIDs=&distBonusSelection=0&orderBy=CashDividend%20desc&';


const calcforward = (price, divYield) => {
    const rate = 2.75 / 100

    if (price && divYield) {
        return price * (Math.E) ** (rate - (divYield / 100))
    } else if (price && !divYield) {
        return price * (Math.E) ** (rate)
    }
}


const logPosts = async () => {
    try {
        let allpages = pages.map(num => axios(`${apiURL}${num}`));
        let info = await Promise.all(allpages);
        return parserforhtml(info);
    } catch (error) {
        console.error('Error:', error);
    }
};


// const cheerio = require("cheerio");
// const axios = require("axios");

console.log("\n***********************************\n" +
    "Grabbing every thread name, pr, dyield, ddate" +
    "from argaam" +
    "\n***********************************\n");

const parserforhtml = info => {
    let results = [];
    console.log(info.length);
    for (var page in info) {
        const $ = cheerio.load(info[page].data);


        $(".aplusholdBM tr").each(function (i, element) {
            const td = $(element).find("td");

            const name = td.eq(0).text();

            const price = td.eq(3).text();
            const divYield = td.eq(4).text();
            const distDate = td.eq(6).text();
            const decDate = td.eq(7).text();

            results.push({
                name,
                price,
                divYield,
                distDate,
                decDate

            });
        });

    }


    //console.log(JSON.stringify(results, null, 2));

    return results.filter(result => result.name && result.price).map(result => {
        if (result.divYield === "-") {
            result.divYield = null
        }

        if (result.distDate === "-") {
            result.distDate = null
        } else {
            result.distDate = new Date(result.distDate)
        }

        if (result.decDate === "-") {
            result.decDate = null
        } else {
         
            result.decDate =    new Date(result.decDate)
        }
        //console.log(JSON.stringify(result, null, 2));

        result.forward = calcforward(result.price, result.divYield)


        return result

    })

};


module.exports.logPosts = logPosts
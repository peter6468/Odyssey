// const cheerio = require("cheerio");
// const axios = require('axios');


// const pages = [
//   '.arabnews.com/economy',
//   '.aljazeera.com/'
// ];

// const apiURL = 'https://www';


// const logPosts = async () => {
//   try {
//     let allpages = pages.map(num => axios(`${apiURL}${num}`));
//     let info = await Promise.all(allpages);
//    return parserforhtml(info);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };


// // const cheerio = require("cheerio");
// // const axios = require("axios");

// console.log("\n***********************************\n" +
//             "Grabbing every thread name, pr, dyield, ddate" +
//             "from argaam" +
//             "\n***********************************\n");
            
// const parserforhtml = info => {
//   let results = [];
//   console.log(info.length);
//    for (var page in info ) {
//    const $ = cheerio.load(info[page].data);
   

//    $(".aplusholdBM tr").each(function(i, element) {
//     const td = $(element).find("td");

//     const name =td.eq(0).text();

//     const price= td.eq(3).text();
//     const divYield= td.eq(4).text();
//     const distDate= td.eq(6).text();
//     const decDate= td.eq(7).text();
  
//     results.push({
//       name, 
//       price,
//       divYield,
//       distDate,
//       decDate
    
//     });
//   });

//   }
  

//   //console.log(JSON.stringify(results, null, 2));
  
//   return results.filter(result => result.name && result.price).map(result => {
//     if (result.divYield === "-"){
//       result.divYield = null
//     }
    
//     if (result.distDate === "-"){
//       result.distDate = null
//     } else {
//       result.distDate = new Date(result.distDate)
//     }
    
//     if (result.decDate === "-"){
//       result.decDate= null
//     } else {
//       result.decDate = new Date(result.decDate)
//     }
//     return result
//   })

// };

// //logPosts();

// module.exports.logPosts=logPosts  
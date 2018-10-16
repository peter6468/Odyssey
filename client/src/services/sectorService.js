import http from'./httpService';
import {apiUrl} from '../config.json'
//genres should be sectors
export function getSectors() {
    //return http.get('http://localhost:3900/api/sector')
    return http.get("/sectors");
}


//when this works goto stocks.jsx and fix import state!!!!!
//line 2 is messed up


//destructred
// import http from'./httpService';
// import {apiUrl} from '../config.json'
// //genres should be sectors
// export function getStocks() {
//     //return http.get('http://localhost:3900/api/sector')
//     return http.get('aprUrl + "/sectors');
// }
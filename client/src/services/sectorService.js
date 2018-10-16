import http from'./httpService';
//genres should be sectors
export function getStocks() {
    return http.get('http://localhost:3900/api/sector')
}


//when this works goto stocks.jsx and fix import state!!!!!
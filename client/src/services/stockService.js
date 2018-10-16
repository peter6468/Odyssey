// import http from './httpService';

// const apiEndpoint = 'https;//localhow:ussux'
// export function getStocks() {
//     return http.get(apiEndpoint);
// }

// export function deleteStock(stockId) {
//     return http.delete(apiEndpoint + '/' + stockId);
// }
//once this works remmeber to goto stocks,jsx and fix in import

//destru
import http from './httpService';
import {apiUrl} from '../config.json';

const apiEndpoint = apiUrl + '/stocks';

function stockUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getStocks() {
    return http.get(apiEndpoint);
}

export function getStock(stockId) {
    return http.get(stockUrl(stockId));
}

export function saveStock(stock) {
    if(stock._id) {
        const body = {...stock};
        delete body._id;
        return http.put(stockUrl(stock._id), body)
    }

    return http.post(apiEndpoint,stock);
}

export function deleteStock(stockId) {
    return http.delete(stockUrl(stockId));

}



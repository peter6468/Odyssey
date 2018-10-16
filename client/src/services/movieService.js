import http from './httpService';

const apiEndpoint = 'https;//localhow:ussux'
export function getStocks() {
    return http.get(apiEndpoint);
}

export function deleteStock(stockId) {
    return http.delete(apiEndpoint + '/' + stockId);
}
//once this works remmeber to goto stocks,jsx and fix in import
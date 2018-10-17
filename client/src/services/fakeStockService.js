

export function getStocks() {
  return stocks;
}

export function getStock(id) {
  return stocks.find(m => m._id === id);
}

export function saveStock(stock) {
  let stockInDb = stocks.find(m => m._id === stock._id) || {};
  stockInDb.name = stock.title;
  stockInDb.genre = genresAPI.genres.find(g => g._id === stock.genreId);
  stockInDb.numberInStock = stock.numberInStock;
  stockInDb.dailyRentalRate = stock.dailyRentalRate;

  if (!stockInDb._id) {
    stockInDb._id = Date.now().toString();
    stocks.push(stockInDb);
  }

  return stockInDb;
}

export function deleteStock(id) {
  let stockInDb = stocks.find(m => m._id === id);
  stocks.splice(stocks.indexOf(stockInDb), 1);
  return stockInDb;
}

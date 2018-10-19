const db = require("../models");
const arete = require("../client/src/utils/arete");

// Defining methods for the StockController
module.exports = {
  findAll: function(req, res) {
    arete.logPosts().then(stocks => {
      console.log(stocks);
      db.Stock.insertMany(stocks)
      .then(() => {
        console.log('insertMany')
        db.Stock
        .find({})
        //.sort({ date: -1 })
        .then(dbStock => res.json(dbStock))
        .catch(err => res.status(422).json(err));
      })
  
    })
   
  },
  findById: function(req, res) {
    db.Stock
      .findById(req.params.id)
      .then(dbStock => res.json(dbStock))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    const Stock = {
      _id: req.body._id,
      name: req.body.name,
      price: req.body.price,
      divYield: req.body.divYield,
      disdate: req.body.disdate,
      decdate: req.body.decdate
    };
    db.Stock
      .create(Stock)
      .then(dbStock => res.json(dbStock))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Stock
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbStock => res.json(dbStock))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Stock
      .findById({ _id: req.params.id })
      .then(dbStock => dbStock.remove())
      .then(dbStock => res.json(dbStock))
      .catch(err => res.status(422).json(err));
  }
};

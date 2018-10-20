const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  //_id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true},
  price: { type: Number, required: true},
  divYield: { type: Number},
  distDate: { type: Date },
  decDate: { type: Date },
  forward: { type: Number}
})

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;



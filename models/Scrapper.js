const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  divYield: { type: Number},
  disdate: { type: Date },
  decdate: { type: Date }
}, { _id: false });

const Article = mongoose.model("Article", articleSchema);

//module.exports = Scrapper;

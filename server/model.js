const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  Ticker: {
    type: String,
    required: true,
  },
  CompanyName: {
    type: String,
    required: true,
  },
  MarketCap: {
    type: String,
    required: true,
  },
  PERatio: {
    type: String,
    required: true,
  },
  TrailingPE: {
    type: String,
    required: true,
  },
  ForwardPE: {
    type: String,
    required: true,
  },
  DividendPerShare: {
    type: String,
    required: true,
  },
  DividendYield: {
    type: String,
    required: true,
  },
  GrossProfitTTM: {
    type: String,
    required: true,
  },
  RevenueTTM: {
    type: String,
    required: true,
  },
  AnalystTargetPrice: {
    type: String,
    required: true,
  },
});

const stockDB = mongoose.model("stockdb", schema);

module.exports = stockDB;

let stockDB = require("./model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Don't forget to put in data!" });
    return;
  }

  const stock = new stockDB({
    Ticker: req.body.Ticker,
    CompanyName: req.body.CompanyName,
    MarketCap: req.body.MarketCap,
    PERatio: req.body.PERatio,
    TrailingPE: req.body.TrailingPE,
    ForwardPE: req.body.ForwardPE,
    DividendPerShare: req.body.DividendPerShare,
    DividendYield: req.body.DividendYield,
    GrossProfitTTM: req.body.GrossProfitTTM,
    RevenueTTM: req.body.RevenueTTM,
    AnalystTargetPrice: req.body.AnalystTargetPrice,
  });

  stock
    .save(stock)
    .then((data) => {
      res.redirect("/download-page");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Unable to save to database",
      });
    });
};

exports.find = (req, res) => {
  stockDB
    .find()
    .then((stock) => {
      res.send(stock);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while getting user information",
      });
    });
};

exports.delete = (req, res) => {
  stockDB
    .deleteMany()
    .then((stock) => {
      res.send("All stock records deleted");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something happened while deleting the stocks",
      });
    });
};

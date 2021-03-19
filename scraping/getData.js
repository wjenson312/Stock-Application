const scrape = require("./initScrape");
const axios = require("axios");
const write = require("./writeToFile");
const clearDB = require("./clearDB");

const tickers = scrape("https://finance.yahoo.com/gainers/?offset=0&count=100");

async function GetStockInfo(ticker) {
  let stocks = [];
  await axios
    .get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${process.env.API_KEY}`
    )
    .then((response) => {
      stocks.push({
        Ticker: response.data.Symbol,
        CompanyName: response.data.Name,
        MarketCap: response.data.MarketCapitalization,
        PERatio: response.data.PERatio,
        TrailingPE: response.data.TrailingPE,
        ForwardPE: response.data.ForwardPE,
        DividendPerShare: response.data.DividendPerShare,
        DividendYield: response.data.DividendYield,
        GrossProfitTTM: response.data.GrossProfitTTM,
        RevenueTTM: response.data.RevenueTTM,
        AnalystTargetPrice: response.data.AnalystTargetPrice,
        // "50DayMovingAverage": response.data["50DayMovingAverage"],
        // "52WeekHigh": response.data["52WeekHigh"],
        // "52WeekLow": response.data["52WeekLow"],
      });

      return stocks;
    });
  return stocks;
}

function PopulateDB() {
  tickers
    .then(async (ticker) => {
      const setTimeoutPromise = (timeout) =>
        new Promise((resolve) => {
          setTimeout(resolve, timeout);
        });

      for (let i = 0; i < ticker.length; ++i) {
        if (ticker[i] === "") {
          ticker.splice(i);
        }
      }

      for (let j = 0; j < ticker.length; ++j) {
        if ((j + 1) % 5 === 0) {
          await setTimeoutPromise(60000);
        } else {
          console.log("Getting Information");
          GetStockInfo(ticker[j]).then((data) => {
            console.log("Looping Through Data");
            for (let k = 0; k < data.length; ++k) {
              console.log("Sending Request");
              axios
                .post("http://localhost:3000/api/stocks", {
                  Ticker: data[k].Ticker,
                  CompanyName: data[k].CompanyName,
                  MarketCap: data[k].MarketCap,
                  PERatio: data[k].PERatio,
                  TrailingPE: data[k].TrailingPE,
                  ForwardPE: data[k].ForwardPE,
                  DividendPerShare: data[k].DividendPerShare,
                  DividendYield: data[k].DividendYield,
                  GrossProfitTTM: data[k].GrossProfitTTM,
                  RevenueTTM: data[k].RevenueTTM,
                  AnalystTargetPrice: data[k].AnalystTargetPrice,
                })
                .then(
                  (response) => {
                    console.log(response);
                  },
                  (error) => {
                    console.log(error.message);
                  }
                );
            }
          });
        }
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// clearDB.clear();
// PopulateDB();

setInterval(() => {
  let now = new Date();
  let date = `${now.getHours()}:${now.getMinutes()}`;

  if (date === "7:0") {
    clearDB.clear();
    PopulateDB();
    setTimeout(write.writeToFile(), 1200000);
  }
}, 57000);

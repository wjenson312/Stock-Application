const fs = require("fs");
const axios = require("axios");

async function GetFromStockDB() {
  let content = `Ticker, CompanyName, MarketCap, PERatio, TrailingPE, ForwardPE, DividendPerShare, DividendYield, GrossProfitTTM, RevenueTTM, AnalystTargetPrice \n`;
  await axios.get("http://localhost:3000/api/stocks").then((response) => {
    for (let i = 0; i < response.data.length; ++i) {
      response.data[i].CompanyName = response.data[i].CompanyName.replace(
        ",",
        ""
      );
      content += `${response.data[i].Ticker}, ${response.data[i].CompanyName}, ${response.data[i].MarketCap}, ${response.data[i].PERatio}, ${response.data[i].TrailingPE}, ${response.data[i].ForwardPE}, ${response.data[i].DividendPerShare}, ${response.data[i].DividendYield}, ${response.data[i].GrossProfitTTM}, ${response.data[i].RevenueTTM}, ${response.data[i].AnalystTargetPrice} \n`;
    }
    return content;
  });

  return content;
}

exports.writeToFile = () => {
  let data = GetFromStockDB();
  data.then((stocks) => {
    fs.writeFile("DailyGainers.csv", stocks, () => {});
  });
};

// let data = GetFromStockDB();
// data.then((stocks) => {
//   fs.writeFile("DailyGainers.csv", stocks, () => {});
// });

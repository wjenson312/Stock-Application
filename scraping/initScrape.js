const axios = require("axios");
const cheerio = require("cheerio");

async function GetInitialData(url) {
  let stockTickers = [];
  await axios.get(url).then((response) => {
    const $ = cheerio.load(response.data);
    for (let i = 0; i < 100; ++i) {
      const ticker = $(`[aria-label='Symbol']:eq(${i})`).text();
      stockTickers.push(ticker);
    }
    return stockTickers;
  });
  return stockTickers;
}
module.exports = GetInitialData;

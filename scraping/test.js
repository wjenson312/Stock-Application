const axios = require("axios");

axios
  .post("http://localhost:3000/api/stocks", {
    Ticker: "ABCD",
    CompanyName: "EFGH",
    MarketCap: "9999999",
    PERatio: "7",
  })
  .then(
    (response) => {
      console.log(response);
    },
    (error) => {
      console.log(error.message);
    }
  );

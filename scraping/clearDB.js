const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../config.env") });

exports.clear = () => {
  axios
    .delete("http://localhost:3000/api/stocks", {
      headers: { "x-api-key": process.env.ADMIN_API_KEY },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

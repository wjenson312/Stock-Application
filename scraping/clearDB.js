const axios = require("axios");

exports.clear = () => {
  axios
    .delete("http://localhost:3000/api/stocks")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

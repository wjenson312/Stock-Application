setInterval(() => {
  let now = new Date();
  let date = `${now.getHours()}:${now.getMinutes()}`;

  if (date === "23:0") {
    console.log("It is 11:00");
    setTimeout(() => {
      console.log("5 mins have passed");
    }, 300000);
  }
}, 57000);

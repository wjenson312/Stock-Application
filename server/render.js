exports.homeRoute = (req, res) => {
  res.render("index");
};

exports.download_page = (req, res) => {
  res.render("download");
};

exports.about_page = (req, res) => {
  res.render("about");
};

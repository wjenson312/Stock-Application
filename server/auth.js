module.exports = function requireAdminKey(req, res, next) {
  const key = req.header("x-api-key");

  if (!process.env.ADMIN_API_KEY) {
    return res.status(500).send({ message: "Server is missing ADMIN_API_KEY configuration" });
  }

  if (key !== process.env.ADMIN_API_KEY) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  next();
};

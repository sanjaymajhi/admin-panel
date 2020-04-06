var jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    res.json({
      saved: "unsuccessful",
      error: { msg: "You are not logged in..." },
    });
    return;
  }
  const decoded = jwt.verify(token, "sanjay");
  req.user_detail = decoded.user;
  next();
};

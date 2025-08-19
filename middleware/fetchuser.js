const jwt = require("jsonwebtoken");
const jwt_key = "shhh";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "give correct authentication" });
  }
  try {
    const data = jwt.verify(token, jwt_key);
    req.user = data.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server Issue" });
  }
};

module.exports = fetchuser;

const jwt = require("jsonwebtoken");
const User = require("../modal/user");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ error: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, "moid@313");
    const user = await User.findOne({
      _id: decoded.id,
    });


    if (!user) {
      throw new Error("invalid token");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = authMiddleware;

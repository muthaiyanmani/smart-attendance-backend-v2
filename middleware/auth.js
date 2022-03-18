const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
  } catch (error) {
    res.clearCookie("token");
    return res.status(401).json({ message: "Invalid Token" });
  }
  return next();
};

module.exports = auth;

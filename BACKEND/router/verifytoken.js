const jwt = require('jsonwebtoken');
const JWTSEC = "@2@2@2gyhfur !@";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, JWTSEC, (err, user) => {
      if (err) {
        return res.status(401).json("Invalid or expired token"); // Changed status code to 401 for unauthorized access
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Access token is missing"); // Changed status code to 401 for unauthorized access
  }
};

module.exports = { verifyToken };

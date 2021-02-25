const jwt = require("jsonwebtoken");
const AuthenticateToken = (req, res, next) => {
  const tokenHeader = req?.headers["authorization"];
  console.log(tokenHeader);
  const token = tokenHeader?.split(" ")[1];
  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) {
      res.status(401).send("Invalid User Token");
    } else {
      req.user = user;
      next();
    }
  });
};

const AuthenticateAdminRole = (req, res, next) => {
  console.log("role", req.user.role);
  if (req.user.role == "admin" || req.user.role == "super") {
    next();
  } else {
    res.status(403).send("Do not Have Access");
  }
};
const AuthenticateSuperAdminRole = (req, res, next) => {
  // console.log("role", req.user.role);
  if (req.user.role == "super") {
    next();
  } else {
    res.status(403).send("Do not Have Access");
  }
};

module.exports = {
  AuthenticateToken,
  AuthenticateAdminRole,
  AuthenticateSuperAdminRole,
};

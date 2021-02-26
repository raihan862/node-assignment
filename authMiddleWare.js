/*
This file container All the Authentication
and Authorization MiddleWares.
*/
const jwt = require("jsonwebtoken");

// Token Validation middle

const AuthenticateToken = (req, res, next) => {
  const tokenHeader = req?.headers["authorization"];
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

// Admin Validation middleware

const AuthenticateAdminRole = (req, res, next) => {
  if (req.user.role == "admin" || req.user.role == "super") {
    next();
  } else {
    res.status(403).send("Do not Have Access");
  }
};

// Supper Admin Validation Middleware

const AuthenticateSuperAdminRole = (req, res, next) => {
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

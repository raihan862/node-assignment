/*
This file container All the Authentication
and Authorization MiddleWares.
*/
const { log } = require("debug");
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

// this middleware is for checking if the user themselve want to
// update/delete their own profile or the login user is an super user

const AuthenticateSuperOrUser = (req, res, next) => {
  const id = res.params?.id || req.body._id;

  if (id == req.user._id || req.user.role == "super") {
    next();
  } else {
    res.status(403).send("You Do Not Have Permission");
  }
};

const GetPagginations = (req, res, next) => {
  var pageNo = parseInt(req.query.pageNo);

  const offset = (pageNo - 1) * 9;
  //const limit = pageNo * 9;
  req.offset = offset;
  next();
};
module.exports = {
  AuthenticateToken,
  AuthenticateAdminRole,
  AuthenticateSuperAdminRole,
  AuthenticateSuperOrUser,
  GetPagginations,
};

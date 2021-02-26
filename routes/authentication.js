const express = require("express");
const router = express.Router();
const Users = require("../Schemas/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
router.use(express.json());

//Login Endpoint

router.post("/login", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  Users.findOne({ name: name, password: password })
    .then((user) => {
      if (user == null) {
        res.status(401).send("Incorrect Username or Password");
      }
      console.log();
      const token = generateToken(user);
      res.status(200).json({ accessToken: token });
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

// Generate User Token

const generateToken = (user) => {
  return jwt.sign(JSON.stringify(user), process.env.SECRET_TOKEN);
};

module.exports = router;

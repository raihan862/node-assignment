const express = require("express");
const router = express.Router();
const Users = require("../Schemas/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
router.use(express.json());
router.post("/login", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  console.log(name, password);
  Users.findOne({ name: name, password: password })
    .then((user) => {
      if (user == null) {
        res.status(401).send("Incorrect Username or Password");
      }
      console.log();
      // console.log(user[0]);
      const token = generateToken(user);
      // console.log(token);
      res.status(200).json({ accessToken: token });
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});

const generateToken = (user) => {
  return jwt.sign(JSON.stringify(user), process.env.SECRET_TOKEN);
};

module.exports = router;

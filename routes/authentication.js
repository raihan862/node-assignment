const express = require("express");
const router = express.Router();
const Users = require("../Schemas/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
router.use(express.json());

//Login Endpoint

router.post("/login", async (req, res) => {
  try {
    const user = JSON.parse(req.body.data);
    const name = user.name;
    const password = user.password;
    const response = await Users.findOne({ name: name, password: password });
    if (response == null) {
      res.status(401).send("Incorrect Username or Password");
    }
    const token = await generateToken(response);
    res.status(200).json({ accessToken: token });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

// Generate User Token

const generateToken = (user) => {
  return jwt.sign(JSON.stringify(user), process.env.SECRET_TOKEN);
};

module.exports = router;

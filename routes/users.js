const express = require("express");
const router = express.Router();
const Users = require("../Schemas/userSchema");
const {
  AuthenticateToken,
  AuthenticateAdminRole,
} = require("../authMiddleWare");
router.use(express.json());

router.get("/", AuthenticateToken, AuthenticateAdminRole, (req, res) => {
  Users.find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err.message));
});
router.post("/create-user", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const newUser = new Users({
    name,
    email,
    password,
    role,
  });
  newUser
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.send());
});

router.patch("/update-user", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const updateData = {
    name,
    email,
    password,
    role,
  };
  console.log(updateData);
  Users.findByIdAndUpdate(id, updateData, {
    upsert: true,
  })
    .then((data) => {
      res.status(200).send("Successfully Update");
    })
    .catch((err) => res.send(err.message));
  // (err, data) => {
  //   if (err) {
  //     res.send(err.message);
  //   }
  //   res.status(200).send("Successfully Updated");
});
router.delete("/delete-user/:userId", (req, res) => {
  const id = req.params.userId;
  Users.findByIdAndDelete(id, (err, user) => {
    if (err) {
      res.send("User Not Found");
    } else {
      res.send("delete" + user);
    }
  });
});

module.exports = router;

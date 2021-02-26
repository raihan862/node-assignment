const express = require("express");
const router = express.Router();
const Users = require("../Schemas/userSchema");
const {
  AuthenticateToken,
  AuthenticateAdminRole,
  AuthenticateSuperAdminRole,
} = require("../authMiddleWare");
router.use(express.json());

// Users List, Only Super Admin Can access

router.get("/", AuthenticateToken, AuthenticateSuperAdminRole, (req, res) => {
  Users.find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err.message));
});

//Creating User, Public access

router.post("/create-user", (req, res) => {
  const newUser = new Users(req.body);
  newUser
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.send());
});

// Update User info, Only the super admin and
// the User themselve can access

router.patch("/update-user", AuthenticateToken, (req, res) => {
  const id = req.body.id;
  if (id == req.user._id || req.user.role == "super") {
    Users.findByIdAndUpdate(id, req.body, {
      upsert: true,
    })
      .then((data) => {
        res.status(200).send("Successfully Update");
      })
      .catch((err) => res.send(err.message));
  } else {
    res.status(403).send("You Do Not Have Permission");
  }
});

// Delete User, Only the super admin and
// the User themselve can access

router.delete("/delete-user/:userId", AuthenticateToken, (req, res) => {
  const id = req.params.userId;
  if (id == req.user._id || req.user.role == "super") {
    Users.findByIdAndDelete(id, (err, user) => {
      if (err) {
        res.send("User Not Found");
      } else {
        res.send("delete" + user);
      }
    });
  } else {
    res.status(403).send("You Do Not Have Permission");
  }
});

module.exports = router;

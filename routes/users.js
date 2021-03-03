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

router.get(
  "/",
  AuthenticateToken,
  AuthenticateSuperAdminRole,
  async (req, res) => {
    try {
      const response = await Users.find();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

//Creating User, Public access

router.post("/create-user", async (req, res) => {
  try {
    const newUser = new Users(req.body);
    const response = await newUser.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update User info, Only the super admin and
// the User themselve can access

router.patch("/update-user", AuthenticateToken, async (req, res) => {
  const id = req.body.id;
  if (id == req.user._id || req.user.role == "super") {
    try {
      const response = await Users.findByIdAndUpdate(id, req.body, {
        upsert: true,
      });
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(403).send("You Do Not Have Permission");
  }
});

// Delete User, Only the super admin and
// the User themselve can access

router.delete("/delete-user/:userId", AuthenticateToken, async (req, res) => {
  const id = req.params.userId;
  if (id == req.user._id || req.user.role == "super") {
    try {
      const response = await Users.findByIdAndDelete(id);
      if (response == null) res.status(200).send("User Does Not Exist");
      res.status(200).send("deleted user" + response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(403).send("You Do Not Have Permission");
  }
});

module.exports = router;

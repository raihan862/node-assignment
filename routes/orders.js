// Maintain All order related Endpoints

const express = require("express");
const router = express.Router();
const Orders = require("../Schemas/orderSchema");
const {
  AuthenticateToken,
  AuthenticateAdminRole,
  AuthenticateSuperAdminRole,
} = require("../authMiddleWare");
const { route } = require("./users");
router.use(express.json());

// All Orders, only Super Admin Can Access

router.get("/", AuthenticateToken, AuthenticateSuperAdminRole, (req, res) => {
  Orders.find({})
    .then((data) => res.json(data))
    .catch((err) => res.send(err.message));
});

// Make a new Order, Anyone can access after Login

router.post("/make-order", AuthenticateToken, (req, res) => {
  const newOrder = new Orders(req.body);
  newOrder
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.send(err.message));
});

// Updating Order Status, Admin and Super Admin Can access

router.patch(
  "/update-status",
  AuthenticateToken,
  AuthenticateAdminRole,
  (req, res) => {
    Orders.findByIdAndUpdate(req.body.id, { status: req.body.status })
      .then((data) => res.status(200).send("Successfully updated order"))
      .catch((err) => res.send(err.message));
  }
);

// List Of all pending Orders, Admin and Super Admin Can access

router.get(
  "/pending-orders",
  AuthenticateToken,
  AuthenticateAdminRole,
  (req, res) => {
    Orders.find({ status: "pending" })
      .then((data) => res.json(data))
      .catch((err) => res.send(err.message));
  }
);

// Get Oders By Date, Only Super Admin Can Access

router.get(
  "/daily-orders",
  AuthenticateToken,
  AuthenticateSuperAdminRole,
  (req, res) => {
    Orders.find({ date: req.body.date })
      .then((data) => res.json(data))
      .catch((err) => res.send(err.message));
  }
);

module.exports = router;

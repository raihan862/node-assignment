const express = require("express");
const router = express.Router();
const Orders = require("../Schemas/orderSchema");
const {
  AuthenticateToken,
  AuthenticateAdminRole,
  AuthenticateSuperAdminRole,
} = require("../authMiddleWare");
router.use(express.json());

router.get("/", AuthenticateToken, AuthenticateSuperAdminRole, (req, res) => {
  Orders.find({})
    .then((data) => res.json(data))
    .catch((err) => res.send(err.message));
});

router.post("/make-order", AuthenticateToken, (req, res) => {
  console.log(req.body);
  const newOrder = new Orders(req.body);
  newOrder
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.send(err.message));
});
router.patch(
  "/update-status",
  AuthenticateToken,
  AuthenticateAdminRole,
  (req, res) => {
    Orders.findByIdAndUpdate(req.body.id, { status: req.body.status })
      .then((data) => res.json(data))
      .catch((err) => res.send(err.message));
  }
);

router.get(
  "/pending-orders",
  AuthenticateToken,
  AuthenticateAdminRole,
  (req, res) => {
    console.log("come");
    Orders.find({ status: "pending" })
      .then((data) => res.json(data))
      .catch((err) => res.send(err.message));
  }
);

module.exports = router;

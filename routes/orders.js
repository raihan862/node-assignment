// Maintain All order related Endpoints

const express = require("express");
const router = express.Router();
const Orders = require("../Schemas/orderSchema");
const {
  AuthenticateToken,
  AuthenticateAdminRole,
  AuthenticateSuperAdminRole,
  GetPagginations,
} = require("../authMiddleWare");
const { route } = require("./users");
router.use(express.json());

// All Orders, only Super Admin Can Access

router.get(
  "/:orderType",
  AuthenticateToken,
  AuthenticateAdminRole,
  GetPagginations,
  async (req, res) => {
    try {
      const off = req.offset;
      const type = req.params.orderType;
      const response = await Orders.paginate(
        { status: type },
        { offset: off, limit: 9 }
      );
      const response2 = await Orders.count();
      res.status(200).json({ data: response.docs, count: response2 });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

// Make a new Order, Anyone can access after Login

router.post("/make-order", AuthenticateToken, async (req, res) => {
  try {
    const newOrder = new Orders(req.body);
    const response = await newOrder.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Updating Order Status, Admin and Super Admin Can access

router.patch(
  "/update-status",
  AuthenticateToken,
  AuthenticateAdminRole,
  async (req, res) => {
    try {
      const response = await Orders.findByIdAndUpdate(req.body.id, {
        status: req.body.status,
      });

      if (response == null) {
        res.status(204).send("No Match Id");
      }
      res.status(200).send("Successfully updated order");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

// List Of all pending Orders, Admin and Super Admin Can access

router.get(
  "/pending-orders/:orderType",
  AuthenticateToken,
  AuthenticateAdminRole,
  async (req, res) => {
    try {
      const type = req.params.orderType;
      const response = await Orders.find({ status: type });
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

// Get Oders By Date, Only Super Admin Can Access

router.get(
  "/daily-orders/:date",
  AuthenticateToken,
  AuthenticateSuperAdminRole,
  async (req, res) => {
    try {
      const date = req.params.date;
      const newDate = new Date(date).toLocaleDateString();
      const response = await Orders.find({ date: newDate });
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.get("/user-orders/:userId", AuthenticateToken, async (req, res) => {
  try {
    const response = await Orders.find({ userId: req.params.userId });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;

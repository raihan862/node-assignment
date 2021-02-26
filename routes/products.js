const express = require("express");
const router = express.Router();
const Products = require("../Schemas/productSchema");
const {
  AuthenticateToken,
  AuthenticateAdminRole,
} = require("../authMiddleWare");
router.use(express.json());

// All Products List, Open For All

router.get("/", AuthenticateToken, (req, res) => {
  Products.find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//Add Products, Admin And Super Admin Can Access

router.post(
  "/add-product",
  AuthenticateToken,
  AuthenticateAdminRole,
  (req, res) => {
    const newProducts = new Products(req.body);
    newProducts
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  }
);
module.exports = router;

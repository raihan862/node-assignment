const express = require("express");
const axios = require("axios");
const router = express.Router();
const Products = require("../Schemas/productSchema");
const {
  AuthenticateToken,
  AuthenticateAdminRole,
  AuthenticateSuperAdminRole,
} = require("../authMiddleWare");
const { route } = require("./users");
router.use(express.json());

// All Products List, Open For All

router.get("/", AuthenticateToken, async (req, res) => {
  try {
    const response = await Products.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Add Products, Admin And Super Admin Can Access

router.post(
  "/add-product",
  AuthenticateToken,
  AuthenticateAdminRole,
  async (req, res) => {
    try {
      const newProducts = new Products(req.body);
      const response = await newProducts.save();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.get(
  "/generate-products",
  AuthenticateToken,
  AuthenticateSuperAdminRole,
  async (req, res) => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      const products = await Products.insertMany(response.data);

      res.status(200).send(products);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);
module.exports = router;

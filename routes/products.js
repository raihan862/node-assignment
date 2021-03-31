const express = require("express");
const axios = require("axios");
const router = express.Router();
const Products = require("../Schemas/productSchema");
const {
  AuthenticateToken,
  AuthenticateAdminRole,
  AuthenticateSuperAdminRole,
  GetPagginations,
} = require("../authMiddleWare");
const { route } = require("./users");
const { log } = require("debug");
router.use(express.json());

// All Products List, Open For All

router.get("/", GetPagginations, async (req, res) => {
  try {
    const off = req.offset;
    const response = await Products.paginate({}, { offset: off, limit: 9 });
    const response2 = await Products.count();

    res.status(200).json({ data: response.docs, count: response2 });
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
      const response = await axios.get(process.env.PRODUCT_URL);
      const products = await Products.insertMany(response.data);

      res.status(200).send(products);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.patch(
  "/update-product",
  AuthenticateToken,
  AuthenticateAdminRole,
  async (req, res) => {
    try {
      const id = req.body._id;
      const newData = {
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image,
      };
      const response = await Products.findByIdAndUpdate(id, newData, {
        upsert: true,
      });

      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.delete(
  "/delete-product/:productId",
  AuthenticateToken,
  AuthenticateAdminRole,
  async (req, res) => {
    try {
      const id = req.params.productId;
      const response = await Products.findByIdAndDelete(id);
      if (response == null) res.status(200).send("User Does Not Exist");
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);
module.exports = router;

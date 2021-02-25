const express = require("express");
const router = express.Router();
const Products = require("../Schemas/productSchema");
const {
  AuthenticateToken,
  AuthenticateAdminRole,
} = require("../authMiddleWare");
router.use(express.json());

router.get("/", AuthenticateToken, AuthenticateAdminRole, (req, res) => {
  console.log("come");
  Products.find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.post("/add-product", (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const newProducts = new Products({
    name,
    price,
    quantity,
  });

  newProducts
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
module.exports = router;

const express = require("express");
const { products } = require("../src/controllers/Products/ProductController");
const ProductRouter = express.Router();

ProductRouter.route("/products").get(products);
module.exports = ProductRouter;
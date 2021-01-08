const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

let products = express.Router();

let products_controller = require("../Controllers/products.controller.js");

products.post("/products/add", products_controller.addProduct);

module.exports = products;

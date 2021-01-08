const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

let store = express.Router();

let store_controller = require("../../Controllers/Store/store.controller");

store.get("/store/get/:type", store_controller.getStore);
 
module.exports = store;

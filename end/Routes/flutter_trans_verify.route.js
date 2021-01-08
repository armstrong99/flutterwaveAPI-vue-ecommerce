const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const flutter_trans_verify = express.Router();

let flutter_trans_verify_controller = require("../Controllers/flutter_trans_verify.controller");

flutter_trans_verify.post(
  "/pay/confirmTrans",
  flutter_trans_verify_controller.verify_trans_registerUser
);

module.exports = flutter_trans_verify;

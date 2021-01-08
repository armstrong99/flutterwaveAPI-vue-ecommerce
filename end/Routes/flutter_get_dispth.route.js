const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const flutter_get_dispatcher = express.Router();

let flutter_get_dispatcher_controller = require("../Controllers/flutter_get_dispatcher.controller");

flutter_get_dispatcher.get(
  "/dispatcher/:id/:email",
  flutter_get_dispatcher_controller.get_my_dispatcher
);

module.exports = flutter_get_dispatcher;

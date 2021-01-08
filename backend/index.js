const express = require("express");
const cors = require("cors");
const app = express();
const flutterAPI = require("./Routes/flutter_trans_verify.route.js");
const productAPI = require("./Routes/products.route.js");
const dispatcherAPI = require("./Routes/flutter_get_dispth.route.js");
const storeAPI = require("./Routes/Stores/getStore.route.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(flutterAPI);
app.use(productAPI);
app.use(dispatcherAPI);
app.use(storeAPI);

let port = process.env.PORT || 3001;

module.exports = server = () =>
  app.listen(port, () => console.log("Server is listening on " + port));
  
// 09037225785
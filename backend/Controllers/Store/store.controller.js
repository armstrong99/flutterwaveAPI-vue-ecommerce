let store = require("../../runtimeStore");
const fs = require("fs");

exports.getStore = async (req, res) => {
  let { type } = req.params;

  try {
    switch (type) {
      case "front-page":
        let frontPage = store["front-page"].products;
        res.send(frontPage);
        break;

      default:
        let frontPageX = {
          products: store[type].products,
          dispatherID: store[type].dispatherID,
        };

        res.send(frontPageX);
        break;
    }
  } catch (error) {
    res.status(404).send("error");
  }
};

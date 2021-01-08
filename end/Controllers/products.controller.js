let store = require("../runtimeStore");

exports.addProduct = async (req, res) => {
  //check if store exist
  let { email, list } = req.body;
  try {
    if (Object.keys(store).includes(email)) {
      store[email].products = [...store[email].products, ...list];
      res.send({ product_insert: true });
    } else {
      res.send({ product_insert: false });
    }
  } catch (error) {
    res.send({ product_insert: false });
  }
};

let SEC_KEY = process.env.SEC_KEY;

let BASE_API_URL = process.env.BASE_API_URL;

const axios = require("axios");

const flutter_createSubAct = async (traderDetails) => {
  try {
    let options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SEC_KEY}`,
      },
    };

    let ans = await axios.post(
      `${BASE_API_URL}/subaccounts`,
      JSON.stringify(traderDetails),
      options
    );

    let mainAnsw = ans.data;

    return mainAnsw;
  } catch (err) {
    console.log(err);
    return "error";
  }
};

module.exports = flutter_createSubAct;

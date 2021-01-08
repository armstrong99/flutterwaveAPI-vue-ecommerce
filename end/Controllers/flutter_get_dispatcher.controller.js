let SEC_KEY = process.env.SEC_KEY;
let BASE_API_URL = process.env.BASE_API_URL;
const axios = require("axios");
let store = require("../runtimeStore.js");

exports.get_my_dispatcher = async (req, res) => {
  let { id, email } = req.params;

  try {
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${SEC_KEY}`,
      },
    };
    let ans = await axios.get(`${BASE_API_URL}/subaccounts`, options);

    let mainAnsw = ans.data;
    res.send(filterForDispatch(mainAnsw.data, id, email));
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const filterForDispatch = (arr = [], id, email) => {
  let myArray = arr
    .filter((obj) => obj.id !== id)
    .filter((obj) => obj.business_name.includes("dispatcher")); //add string dispatcher when naming in the dashboard
  let picker = getRandomInt(0, myArray.length);

  store[email] = {
    ...store[email],
    dispatherID: myArray[picker].subaccount_id,
  };

  return myArray[picker].full_name;
};

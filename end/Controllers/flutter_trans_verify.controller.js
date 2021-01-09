require("dotenv").config();
let request = require("request");
let store = require("../runtimeStore");
let SEC_KEY = process.env.SEC_KEY;
let flutter_createSubAct = require("../helperFlutterAPI/flutter_createSubAct");

exports.verify_trans_registerUser = async (req, res) => {
  let { trans_id, busBio } = req.body;

  try {
    //pls remove this line of code, store should be populated only when transaction is verified, and also return false for non-success below, remove all the create account
    //1. verify flutter payment

    let options = {
      method: "GET",
      url: `https://api.flutterwave.com/v3/transactions/${trans_id}/verify`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SEC_KEY}`,
      },
    };
    request(options, async (err, resp) => {
      if (resp && Object.keys(resp).includes("statusCode")) {
        switch (resp.statusCode) {
          case 200:
            let resp = await flutter_createSubAct(busBio);

            if (resp !== "error") {
              let userData = {
                ...busBio,
                id: resp.data.id,
                subaccount_id: resp.data.subaccount_id,
              };

              store[userData.business_email] = userData;

              res.send({
                verified_register: {
                  id: userData.id,
                  subID: userData.subaccount_id,
                  business_email: userData.business_email,
                },
              });
            } else res.send({ verified_register: false });

            break;

          default:
            res.send({ verified_register: false });
            break;
        }
      } else {
        res.send({ verified_register: false });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

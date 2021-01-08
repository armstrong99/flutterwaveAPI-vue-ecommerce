let getAllSubActs = require("./get_allSubActs");

let data = {
  account_bank: "044",
  account_number: "0690000037",
  business_name: "Eternal Blue",
  business_email: "petya@stux.net",
  business_contact: "Anonymous",
  business_contact_mobile: "090890382",
  business_mobile: "09087930450",
  country: "NG",
  meta: [
    {
      meta_name: "mem_adr",
      meta_value: "0x16241F327213",
    },
  ],
  split_type: "percentage",
  split_value: 0.5,
  products: [],
};

getAllSubActs("get-my-dispatcher")
  .then((res) => {
    if (res !== undefined) {
      console.log(res.data.filter((val) => val.id !== 7878));
    }
  })
  .catch((e) => console.log(e));

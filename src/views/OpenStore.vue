<template>
  <div class="bg-gray-200 flex flex-col h-full text-black">
    <i class="block text-left">{{ bank }}</i>
    <h1 class="mt-8">Open a Shop wall with Jumga <br /></h1>
    <h2 class="text-2xl text-left md:text-center font-extrabold mt-8 ml-2">
      We keep your store open 24/7<br />
      and take care of all logistics<br />
      and payments
    </h2>

    <form class="mt-16 mx-auto" @submit="(e) => e.preventDefault()">
      <lable htmlfor="business-name" class="font-medium text-left block"
        >Business name:</lable
      >
      <input
        required
        id="business-name"
        class="block p-3"
        type="text"
        name="name"
        placeholder="business name"
        v-model="business_name"
      />

      <lable htmlfor="bank" class="font-medium text-left mt-6 block"
        >Business Bank:
      </lable>
      <select required id="bank" v-model="account_bank">
        <option required v-for="k in banksCode" :key="k.id" :value="k.code">
          {{ k.name }}
        </option>
      </select>

      <lable htmlfor="account-number" class="font-medium mt-6 block text-left"
        >Account Number:</lable
      >
      <input
        required
        id="account-number"
        class="block p-3"
        type="number"
        name="name"
        placeholder="account number"
        v-model="account_number"
      />

      <lable htmlfor="email" class="font-medium mt-6 block text-left"
        >Business email:</lable
      >
      <input
        required
        id="email"
        class="block p-3"
        type="email "
        name="name"
        placeholder="business email"
        v-model="business_email"
      />

      <lable htmlfor="phone" class="font-medium mt-6 block text-left"
        >Business mobile:</lable
      >
      <input
        required
        id="phone"
        class="block p-3"
        type="number"
        name="contact"
        placeholder="business mobile"
        v-model="business_mobile"
      />

      <button
        class="bg-orange-400 text-white p-2 mt-4 bt-radius-3 cursor-pointer"
        type="submit"
        @click="makePayment()"
      >
        Pay now
      </button>
      <br />
      <br />
      <br />
    </form>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import router from "../router/index";
import axios from "axios";

export default {
  name: "OpenStore",
  setup() {
    const state = reactive({
      business_name: "",
      business_email: "",
      split_type: "percentage",
      business_mobile: "",
      account_number: "",
      account_bank: "",
      notifyMsg: "",
      banksCode: [
        {
          id: 132,
          code: "560",
          name: "Page MFBank",
        },
        {
          id: 133,
          code: "304",
          name: "Stanbic Mobile Money",
        },
        {
          id: 134,
          code: "308",
          name: "FortisMobile",
        },
        {
          id: 135,
          code: "328",
          name: "TagPay",
        },
        {
          id: 136,
          code: "309",
          name: "FBNMobile",
        },
        {
          id: 137,
          code: "011",
          name: "First Bank of Nigeria",
        },
        {
          id: 138,
          code: "326",
          name: "Sterling Mobile",
        },
        {
          id: 139,
          code: "990",
          name: "Omoluabi Mortgage Bank",
        },
        {
          id: 140,
          code: "311",
          name: "ReadyCash (Parkway)",
        },
        {
          id: 141,
          code: "057",
          name: "Zenith Bank",
        },
        {
          id: 142,
          code: "068",
          name: "Standard Chartered Bank",
        },
        {
          id: 143,
          code: "306",
          name: "eTranzact",
        },
        {
          id: 144,
          code: "070",
          name: "Fidelity Bank",
        },
        {
          id: 145,
          code: "023",
          name: "CitiBank",
        },
        {
          id: 146,
          code: "215",
          name: "Unity Bank",
        },
        {
          id: 147,
          code: "323",
          name: "Access Money",
        },
        {
          id: 148,
          code: "302",
          name: "Eartholeum",
        },
        {
          id: 149,
          code: "324",
          name: "Hedonmark",
        },
        {
          id: 150,
          code: "325",
          name: "MoneyBox",
        },
        {
          id: 151,
          code: "301",
          name: "JAIZ Bank",
        },
        {
          id: 152,
          code: "050",
          name: "Ecobank Plc",
        },
        {
          id: 153,
          code: "307",
          name: "EcoMobile",
        },
        {
          id: 154,
          code: "318",
          name: "Fidelity Mobile",
        },
        {
          id: 155,
          code: "319",
          name: "TeasyMobile",
        },
        {
          id: 156,
          code: "999",
          name: "NIP Virtual Bank",
        },
        {
          id: 157,
          code: "320",
          name: "VTNetworks",
        },
        {
          id: 158,
          code: "221",
          name: "Stanbic IBTC Bank",
        },
        {
          id: 159,
          code: "501",
          name: "Fortis Microfinance Bank",
        },
        {
          id: 160,
          code: "329",
          name: "PayAttitude Online",
        },
        {
          id: 161,
          code: "322",
          name: "ZenithMobile",
        },
        {
          id: 162,
          code: "303",
          name: "ChamsMobile",
        },
        {
          id: 163,
          code: "403",
          name: "SafeTrust Mortgage Bank",
        },
        {
          id: 164,
          code: "551",
          name: "Covenant Microfinance Bank",
        },
        {
          id: 165,
          code: "415",
          name: "Imperial Homes Mortgage Bank",
        },
        {
          id: 166,
          code: "552",
          name: "NPF MicroFinance Bank",
        },
        {
          id: 167,
          code: "526",
          name: "Parralex",
        },
        {
          id: 168,
          code: "035",
          name: "Wema Bank",
        },
        {
          id: 169,
          code: "084",
          name: "Enterprise Bank",
        },
        {
          id: 170,
          code: "063",
          name: "Diamond Bank",
        },
        {
          id: 171,
          code: "305",
          name: "Paycom",
        },
        {
          id: 172,
          code: "100",
          name: "SunTrust Bank",
        },
        {
          id: 173,
          code: "317",
          name: "Cellulant",
        },
        {
          id: 174,
          code: "401",
          name: "ASO Savings and & Loans",
        },
        {
          id: 175,
          code: "030",
          name: "Heritage",
        },
        {
          id: 176,
          code: "402",
          name: "Jubilee Life Mortgage Bank",
        },
        {
          id: 177,
          code: "058",
          name: "GTBank Plc",
        },
        {
          id: 178,
          code: "032",
          name: "Union Bank",
        },
        {
          id: 179,
          code: "232",
          name: "Sterling Bank",
        },
        {
          id: 180,
          code: "076",
          name: "Skye Bank",
        },
        {
          id: 181,
          code: "082",
          name: "Keystone Bank",
        },
        {
          id: 182,
          code: "327",
          name: "Pagatech",
        },
        {
          id: 183,
          code: "559",
          name: "Coronation Merchant Bank",
        },
        {
          id: 184,
          code: "601",
          name: "FSDH",
        },
        {
          id: 185,
          code: "313",
          name: "Mkudi",
        },
        {
          id: 186,
          code: "214",
          name: "First City Monument Bank",
        },
        {
          id: 187,
          code: "314",
          name: "FET",
        },
        {
          id: 188,
          code: "523",
          name: "Trustbond",
        },
        {
          id: 189,
          code: "315",
          name: "GTMobile",
        },
        {
          id: 190,
          code: "033",
          name: "United Bank for Africa",
        },
        {
          id: 191,
          code: "044",
          name: "Access Bank",
        },
        {
          id: 567,
          code: "90115",
          name: "TCF MFB",
        },
      ],
      split_value: 1950 / 2000,
      country: "NG",
    });
    onMounted(() => {
      document.title = "Open store with Jumga";
    });
    function makePayment() {
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
      }
      let accArr = [35, 36, 38, 39, 40, 41, 42, 43, 44, 45];
      let testAcc = getRandomInt(0, accArr.length);
      localStorage.setItem(
        "state",
        JSON.stringify({
          account_number: `06900000${accArr[testAcc]}`,
          account_bank: "044",
          business_name: state.business_name,
          business_email: state.business_email,
          business_mobile: state.business_mobile,
          country: state.country,
          split_type: state.split_type,
          split_value: state.split_value,
        })
      );
      FlutterwaveCheckout({
        public_key: process.env.VUE_APP_PUBLIC_KEY,
        tx_ref: "hooli-tx-1920bbtyt" + Date.now(),
        amount: 20,
        currency: "USD",
        country: state.country,
        payment_options: "card, mobilemoneyghana, ussd",
        // specified redirect URL
        //redirect_url: "http://localhost:8081/openstore",

        customer: {
          email: state.business_email,
          phone_number: state.business_mobile,
          name: state.business_name,
        },
        callback: function (data) {
          console.log(data);
          localStorage.setItem("trans_id", JSON.stringify(data.transaction_id));
          //store the trans-Id in a key 'trans_id'
          window.location.replace("/pay-confirm");
        },
        onclose: function () {
          // close modal
        },
        customizations: {
          title: "My store",
          description: "Payment for owing a store",
          logo: "https://dwglogo.com/wp-content/uploads/2017/11/Shopify_logo_01.png",
        },
      });
    }

    return {
      ...toRefs(state),
      makePayment,
    };
  },
};
</script>

<style lang="scss" scoped>
input {
  background: rgb(241, 241, 241);
}
label {
  font-weight: 700;
}
</style>

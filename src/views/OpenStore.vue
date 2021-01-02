<template>
  <div class="bg-gray-200 flex flex-col h-screen text-black">
    <i class="block text-left">{{ bank }}</i>
    <h1 class="mt-8">Open a Shop wall with Jumga <br /></h1>
    <h2 class="text-2xl text-left md:text-center font-extrabold mt-8 ml-2">
      We keep your store open 24/7<br />
      and take care of all logistics<br />
      and payments
    </h2>

    <form class="mt-16 mx-auto">
      <lable htmlfor="business-name" class="font-medium text-left block"
        >Business name:</lable
      >
      <input
        id="business-name"
        class="block p-3"
        type="text"
        name="name"
        placeholder="business name"
        v-model="busName"
      />

      <lable htmlfor="bank" class="font-medium text-left mt-6 block"
        >Business Bank:</lable
      >
      <select id="bank" v-model="bank">
        <option>Guaranty Trust Bank</option>
        <option>Guaranty Trust Bank</option>
        <option>Guaranty Trust Bank</option>
        <option>Guaranty Trust Bank</option>
        <option>Guaranty Trust Bank</option>
        <option>Guaranty Trust Bank</option>
      </select>

      <lable htmlfor="account-number" class="font-medium mt-6 block text-left"
        >Account Number:</lable
      >
      <input
        id="account-number"
        class="block p-3"
        type="number"
        name="name"
        placeholder="account number"
        v-model="actNo"
      />

      <lable htmlfor="email" class="font-medium mt-6 block text-left"
        >Business email:</lable
      >
      <input
        id="email"
        class="block p-3"
        type="number"
        name="name"
        placeholder="business email"
      />

      <lable htmlfor="phone" class="font-medium mt-6 block text-left"
        >Business email:</lable
      >
      <input
        id="phone"
        class="block p-3"
        type="phone"
        name="name"
        placeholder="business email"
        v-model="phone"
      />

      <button type="button" @click="makePayment()">Pay now</button>
      <br />
      <br />
      <br />
    </form>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import router from "../router/index";
export default {
  name: "OpenStore",
  setup() {
    const state = reactive({
      busName: "",
      phone: "",
      actNo: "",
      bank: "",
    });
    onMounted(() => {
      document.title = "Open store with Jumga";
    });
    function makePayment() {
      sessionStorage.setItem('state', JSON.stringify(state))
      // FlutterwaveCheckout({
      //   public_key: "FLWPUBK_TEST-c1e074fe7a5f36ef5a3c7d41f6f1430f-X",
      //   tx_ref: "hooli-tx-1920bbtyt" + Date.now(),
      //   amount: 20,
      //   currency: "NGN",
      //   country: "NG",
      //   payment_options: "card, mobilemoneyghana, ussd",
      //   // specified redirect URL
      //   //redirect_url: "http://localhost:8081/openstore",
      //   meta: {
      //     consumer_id: 23,
      //     consumer_mac: "92a3-912ba-1192a",
      //   },
      //   customer: {
      //     email: "user@gmail.com",
      //     phone_number: "08102909304",
      //     name: "yemi desola",
      //   },
      //   callback: function (data) {
      //     console.log(data);
      //     window.location.replace("/");
      //   },
      //   onclose: function () {
      //     // close modal
      //   },
      //   customizations: {
      //     title: "My store",
      //     description: "Payment for owing a store",
      //     logo:
      //       "https://thehill.com/sites/default/files/sponsored_image/intuit-photo.jpg",
      //   },
      // });
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
  background: rgb(230, 230, 230);
}
label {
  font-weight: 700;
}
</style>

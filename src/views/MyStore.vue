<template>
  <nav-bar></nav-bar>
  <section
    v-show="loading"
    class="h-screen width-full flex justify-center justify-items-center items-center flex-col"
  >
    <h3 class="font-semibold text-base font-sans">
      {{ msg }}
      <span
        v-show="errBtn"
        @click="getStoreProducts()"
        class="bg-red-500 text-white rounded p-2 cursor-pointer text-base"
        >Try Again!</span
      >
    </h3>
  </section>
  <section
    v-show="!loading"
    class="flex my-6 flex-wrap md:flex-no-wrap w-full content-center h-auto items-center justify-center"
    v-for="(k, i) in products"
    :key="i"
  >
    <img :src="k.productBan" class="buyImage mr-6 rounded" />
    <article class="w-3/12">
      <h1 class="font-bold">{{ k.productName }}</h1>
      <p class="text-justify w-full my-2">
        {{ k.productDescription }}
      </p>
      <small>
        <p class="text-orange-500 mt-1">
          Price: <span class="font-semibold text-black"> ${{ k.productPrice }}</span>
        </p>

        <p class="text-orange-500 mt-1">
          Delivery fee:
          <span class="font-semibold text-black">${{ k.deliveryFee }}</span>
        </p>
      </small>

      <section class="flex w-full h-auto flex-wrap justify-around items-center">
        <button
          type="submit"
          @click="update()"
          class="bg-orange-400 rounded block text-white p-2 mt-8 cursor-pointer"
        >
          Add to cart
        </button>
        <button
          v-show="products.length > 0"
          @click="makePayment(k.productPrice, k.productDescription, k.subID, k.id)"
          class="bg-green-400 block rounded text-white p-2 mt-8 cursor-pointer"
        >
          {{ !bought.includes(k.id) ? "Buy now" : "Bought" }}
        </button>
      </section>
    </article>
  </section>
  <section v-show="!loading" class="mt-16">
    <h2 class="font-bold text-3xl text-center">
      <span class="border-b-4 border-orange-500 rounded-sm pb-2"> Top Sales </span>
    </h2>
    <section
      :class="
        (i + 2) % 2 !== 0
          ? 'flex flex-wrap md:flex-no-wrap flex-row-reverse mt-24 h-auto items-center justify-around mx-auto w-11/12'
          : 'flex flex-wrap md:flex-no-wrap flex-row mt-24 h-auto items-center justify-around mx-auto w-11/12'
      "
      v-for="(k, i) in topSales"
      :key="i"
    >
      <img :src="k.productBan" class="buyImage mr-3 rounded hover:blur-xs" />
      <article class="w-full">
        <h1 class="font-bold">{{ k.productName }}</h1>

        <p class="text-center w-1/2 mx-auto my-2">
          {{ k.productDescription }}
        </p>
        <small>
          <p class="text-orange-500 mt-1">
            Price: <span class="font-semibold text-black"> ${{ k.productPrice }}</span>
          </p>

          <p class="text-orange-500 mt-1">
            Delivery fee:
            <span class="font-semibold text-black">${{ k.deliveryFee }}</span>
          </p>
        </small>

        <section class="flex h-auto flex-wrap w-full justify-center items-center">
          <button
            type="submit"
            @click="update()"
            class="bg-orange-400 rounded block text-white p-2 mt-8 cursor-pointer"
          >
            Add to cart
          </button>
          <button
            v-show="products.length > 0"
            @click="makePayment(k.productPrice, k.productDescription, k.subID, k.id)"
            class="bg-green-400 block rounded ml-12 text-white p-2 mt-8 cursor-pointer"
          >
            {{ !bought.includes(k.id) ? "Buy now" : "Bought" }}
          </button>
        </section>
      </article>
    </section>
  </section>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import NavBar from "@/components/NavBar";
import { useStore } from "vuex";
import axios from "axios";
import SPLIT_PAYMENT from "../FlutterAPI/split_payments";

export default {
  name: "MyStore",
  components: {
    NavBar,
  },
  setup(props) {
    let store = useStore();
    let { business_id } = useRoute().params;
    const state = reactive({
      name: useRoute,
      loading: true,
      products: [],
      msg: "Loading...",
      errBtn: false,
      topSales: [],
      dispatherID: "",
      bought: [],
    });

    onMounted(() => {
      state.name = business_id;
      getStoreProducts(state.name);
    });

    const update = () => {
      store.commit("addToCart");
    };

    const getStoreProducts = async (id) => {
      try {
        let ans = await axios.get(
          process.env.VUE_APP_SERVER_BASE_URL + `/store/get/${id}`
        );
        let { products, dispatherID } = ans.data;
        console.log(products);
        state.products = [products.shift()];
        state.topSales = products;
        state.loading = false;
        state.dispatherID = dispatherID;
      } catch (error) {
        state.errBtn = true;
        state.msg = "Pls we are sorry, an error occured ";
      }
    };

    function makePayment(amt = 2000, desc, subID, id) {
      FlutterwaveCheckout({
        public_key: process.env.VUE_APP_PUBLIC_KEY,
        tx_ref: "hooli-tx-1920bbtyt" + Date.now(),
        amount: amt,
        currency: "NGN",
        country: "NG",
        payment_options: "card, mobilemoneyghana, ussd",
        // specified redirect URL
        //redirect_url: "http://localhost:8081/openstore",
        customer: {
          email: state.name,
          phone_number: state.business_mobile,
          name: state.business_name,
        },
        subaccounts: [
          {
            id: subID,
            transaction_charge: new SPLIT_PAYMENT(amt).get_seller,
            transaction_charge_type: "flat_subaccount",
          },
          {
            id: state.dispatherID,
            transaction_charge: new SPLIT_PAYMENT(amt).get_dispatcher,
            transaction_charge_type: "flat_subaccount",
          },
        ],
        callback: function (data) {
          console.log(data);
          localStorage.setItem("trans_id", JSON.stringify(data.transaction_id));
          //store the trans-Id in a key 'trans_id'
          // window.location.replace("/pay-confirm");
        },
        onclose: function () {
          // close modal
          state.bought = [...state.bought, id];
        },
        customizations: {
          title: state.business_name,
          description: desc,
          logo: "https://dwglogo.com/wp-content/uploads/2017/11/Shopify_logo_01.png",
        },
      });
    }

    return { ...toRefs(state), update, getStoreProducts, makePayment };
  },
};
</script>

<style lang="scss" scoped>
.buyImage {
  height: 25rem;
  width: 30rem;
}
button {
  outline: none;
  border: none;
  transition: ease-in-out 1.1s;
}

button:hover {
  animation: 1.1s animatetop;
  transition: ease-in-out 1.1s;
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
</style>

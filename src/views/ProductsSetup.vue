<template>
  <div>
    <section
      v-show="!completed"
      class="h-screen width-full flex justify-center justify-items-center items-center flex-col"
    >
      <i class="fa fa-check-square text-6xl text-green-400"></i>
      <small class="font-semibold text-2xl">
        Your Store has been successfully created <br />
        <span class="text-gray-500 text-xl" v-if="dispatcherName === ''">
          {{ msg }}
          <span
            v-show="errBtn"
            @click="getDispatcher()"
            class="bg-red-500 text-white rounded p-2 cursor-pointer text-base"
            >Try Again!</span
          >
          <br />
          for your store...
        </span>
        <section
          v-else
          class="flex mt-12 flex-row items-center flex-wrap justify-around w-30"
        >
          <figure>
            <img
              src="https://www.ed2go.com/careers/static/media/images/occupations/untreated_images/935x526/451.jpg"
              alt="dispatcher"
              class="rounded h-48 w-48"
            />
          </figure>
          <figcaption class="text-gray-600 text-sm mt-2">
            <small class="text-sm mt-3 text-gray-500 mr-2">name:</small>
            {{ dispatcherName }}
            <p class="text-sm mr-6 mt-3 text-gray-500">
              <small class="mr-2">view your store:</small>
              <a
                :href="'/store/' + business_email"
                style="text-decoration: underline"
                class="text-blue-500"
                >my-Store</a
              >
            </p>
          </figcaption>
        </section>
      </small>
    </section>

    <h2
      v-show="completed"
      class="text-2xl text-left md:text-center font-extrabold mt-8 ml-2"
    >
      {{ business_email }}
      Fill in the products you would<br />
      love to sell to complete your store<br />
      registration
    </h2>
    <br />
    <br />
    <section v-show="completed">
      <form
        @submit="
          (e) => {
            e.preventDefault(), update(e);
          }
        "
        class="flex-col flex w-full justify-items-center justify-center items-center"
      >
        <section
          class="flex md:flex-row justify-center items-center content-center flex-col flex-wrap mx-auto"
          style="width: 70%"
        >
          <div
            v-for="(k, i) in UI_Fields"
            :key="i"
            class="mt-6 flex-col mx-2 w-full md:w-1/3 justify-items-center justify-center items-center"
          >
            <label class="block font-semibold text-center">{{ k.label }}:</label>
            <input
              required
              class="block w-full text-center p-2 border-gray-900"
              :type="k.type"
              :placeholder="k.placeholder"
              @keyup="({ target }) => changeHandle(target, k.param)"
              :readonly="k.readOnly"
              :value="getValue(k.param)"
            />
          </div>
        </section>
        <section class="flex w-auto h-auto flex-wrap justify-center items-center">
          <button
            type="submit"
            class="bg-orange-400 block text-white p-2 mt-8 cursor-pointer"
          >
            Add Product
          </button>
          <button
            type="button"
            v-show="products.length > 0"
            @click="sendProduct()"
            class="bg-green-400 block text-white p-2 mt-8 cursor-pointer ml-16"
          >
            Submit
          </button>
        </section>
      </form>
    </section>
    <br />
    <br />
    <br />
    <section
      v-show="completed"
      class="flex w-full h-full flex-wrap-reverse justify-center items-center bg-gray-100"
    >
      <section
        class="flex mt-6 h-auto items-center justify-around"
        style="width: 22rem"
        v-for="(k, i) in products"
        :key="i"
      >
        <img :src="k.productBan" class="w-32 h-32 mr-3 rounded" />
        <article>
          <h1 class="font-bold">{{ k.productName }}</h1>
          <p class="text-justify">
            {{ k.productDescription }}
          </p>
          <small>
            <p class="text-orange-500">
              Price: <span class="font-semibold text-black"> ${{ k.productPrice }}</span>
            </p>

            <p class="text-orange-500">
              Delivery fee:
              <span class="font-semibold text-black">${{ k.deliveryFee }}</span>
            </p>
          </small>
        </article>
      </section>
    </section>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import SPLIT_PAYMENT from "../FlutterAPI/split_payments";

export default {
  name: "ProductSetup",
  components: {},
  setup() {
    let store = useStore();

    const state = reactive({
      completed: true,
      business_email: "hh@gmail.com",
      products: [],
      productName: "",
      productPrice: 0,
      productDescription: "",
      sellerShare: 0,
      deliveryFee: 0,
      productBan: "",

      UI_Fields: [
        {
          label: "Product Name",
          placeholder: "enter product name",
          type: "text",
          param: "productName",
          readOnly: false,
        },
        {
          label: "Product Price",
          placeholder: "enter product price",
          type: "number",
          param: "productPrice",
          readOnly: false,
        },
        {
          label: "Product description",
          placeholder: "enter product description",
          type: "text",
          param: "productDescription",
          readOnly: false,
        },
        {
          label: "Product Banner",
          placeholder: "enter img url",
          type: "text",
          param: "productBan",
          readOnly: false,
        },
        {
          label: "Seller share",
          placeholder: "what you get for that cost price",
          type: "number",
          param: "sellerShare",
          readOnly: true,
        },
        {
          label: "Delivery Fee",
          placeholder: "delivery fee",
          type: "text",
          param: "deliveryFee",
          readOnly: true,
        },
      ],
      userMeta: {},
      dispatcherName: "",
      msg: "pls wait while we get a dispatcher",
      errBtn: false,
      errType: "product",
    });

    onMounted(() => {
      let userMeta = JSON.parse(localStorage.getItem("state"));
      state.business_email = userMeta["business_email"];
      state.userMeta = userMeta;
    });

    let getValue = (param) => state[param];

    let changeHandle = ({ value }, param) => {
      switch (param) {
        case "productPrice":
          state["sellerShare"] = new SPLIT_PAYMENT(value).get_seller;
          state["deliveryFee"] = new SPLIT_PAYMENT(value).get_delivery;
          state[param] = value;

          break;

        default:
          state[param] = value;
          break;
      }
    };

    const update = (e) => {
      let {
        productName,
        productPrice,
        productDescription,
        sellerShare,
        deliveryFee,
        productBan,
        products,
        userMeta,
      } = state;

      state.products = [
        ...products,
        {
          productName,
          productPrice,
          productDescription,
          sellerShare,
          deliveryFee,
          productBan,
          ...userMeta,
        },
      ];

      state.productName = "";
      state.productPrice = 0;
      state.productDescription = "";
      state.productBan = "";
      state["sellerShare"] = 0;
      state["deliveryFee"] = 0;
    };
    const sendProduct = async () => {
      //generate a random ID for the products
      let idx = Date.now().toString() + "-rux8jhd-eudh-dhs43-" + new Date().getSeconds();

      try {
        //assign the ID to the products dictionary
        let productsX = JSON.parse(JSON.stringify(state.products)).map((val, i) => {
          val.id = idx + i;
          return val;
        });

        //make the API call with axios

        let api = `${process.env.VUE_APP_SERVER_BASE_URL}/products/add`;

        let ans = await axios.post(api, {
          list: productsX,
          email: JSON.parse(JSON.stringify(state.business_email)),
        });
        let { product_insert } = ans.data;

        state.completed = !product_insert;
        state.msg = "pls wait while we get a dispatcher";

        if (!product_insert) {
          alert("An error occured pls re-try");
        } else {
          getDispatcher();
        }
        // console.log(product_insert);
      } catch (error) {
        console.log(error);
      }
    };

    const getDispatcher = async () => {
      try {
        let api = `${process.env.VUE_APP_SERVER_BASE_URL}/dispatcher/${state.userMeta.id}/${state.business_email}`;
        let ans = await axios.get(api);
        let result = ans.data;
        state.dispatcherName = result;
        state.msg = "pls wait while we get a dispatcher";
        state.errBtn = false;
      } catch (error) {
        state.errBtn = true;

        alert(
          "An error occured pls try again below so you can get a dispatcher and also your store link"
        );

        state.msg = "An Error occured white getting a dispatcher";
      }
    };

    return {
      ...toRefs(state),
      changeHandle,
      getValue,
      update,
      sendProduct,
      getDispatcher,
    };
  },
};
</script>

<style lang="scss" scoped>
button {
  border-radius: 0.3rem;
  outline: none;
  border: none;
  transition: 1s ease-in-out;
}
button:hover {
  animation: animatetop 1s;
  transition: 1s ease-in-out;
}
input {
  border: 1px solid black;
  border-radius: 0.5rem;
  outline: none;
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

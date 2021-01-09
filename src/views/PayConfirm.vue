<template>
  <section
    class="h-screen width-screen flex justify-center justify-items-center items-center flex-col"
  >
    <i
      v-show="
        msg ===
        'Congratulations!!!, transaction was confirmed and a subaccount has been created for you'
      "
      class="fa fa-check-square text-6xl text-green-400"
    ></i>
    <h3 class="font-semibold text-2xl">
      {{ msg.substring(0, 45) }} <br />
      {{ msg.substring(45, msg.length) }}
    </h3>

    <router-link
      to="/products-setup"
      v-show="
        msg ===
        'Congratulations!!!, transaction was confirmed and a subaccount has been created for you'
      "
    >
      <button class="bg-orange-500 text-white mt-10 rounded p-2 cursor-pointer text-sm">
        Continue
      </button>
    </router-link>
  </section>
</template>

<style lang="sass"></style>

<script>
import { onMounted, reactive, toRefs } from "vue";
import axios from "axios";

export default {
  name: "PayConfirm",
  setup() {
    let state = reactive({
      localData: {},
      trans_id: "",
      msg: "confirming transaction process...",
    });

    onMounted(() => {
      state.localData = JSON.parse(localStorage.getItem("state"));
      state.trans_id = JSON.parse(localStorage.getItem("trans_id"));

      apiPayConfirm();
    });
    const apiPayConfirm = async () => {
      try {
        let api = `${process.env.VUE_APP_SERVER_BASE_URL}/pay/confirmTrans`;
        let data = {
          trans_id: state.trans_id,
          busBio: { ...state.localData, products: [] },
        };
        let ans = await axios.post(api, data);
        console.log(ans);
        let { verified_register } = ans.data;
        if (verified_register) {
          localStorage.setItem("state", JSON.stringify(verified_register));
          state.msg =
            "Congratulations!!!, transaction was confirmed and a subaccount has been created for you";
        } else throw Error();
      } catch (error) {
        console.log(error);
        state.msg = "An Error occured, pls refresh the page";
      }
    };
    return {
      ...toRefs(state),
    };
  },
};
</script>

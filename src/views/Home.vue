<template>
  <div
    style="
      background-image: url(https://images.unsplash.com/photo-1596854701922-3f3cbaed4ce2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fGJvdXRpcXVlfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80);
    "
    class="text-white bg-black-700 w-full bg-no-repeat bg-center bg-cover h-screen overflow-hidden divHome"
  >
    <div class="absolute inset-0 bg-black opacity-75 h-screen divTwoHome flex flex-col">
      <header>
        <NavBar />
      </header>

      <div id="myModal" class="modal" v-show="modal">
        <!-- Modal content -->
        <div class="modal-content">
          <div class="modal-header">
            <span class="close" @click="close()" tooltip="close modal">&times;</span>
          </div>
          <div class="modal-body flex justify-around items-center mt-1">
            <img
              src="https://images.unsplash.com/photo-1596854701922-3f3cbaed4ce2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fGJvdXRpcXVlfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80"
              alt="you can own a store"
              class="w-100 h-50 mx-auto modalPics"
            />
            <article class="text-black flex justify-center items-center flex-col">
              <h2 class="font-bold text-xl">
                You can own a store in just <br />three(3) steps:-
              </h2>
              <ul>
                <li class="liModal">Make a minimal deposit of just $20</li>
                <li class="liModal">
                  Fill general information(e.g shop name, bank details etc)
                </li>

                <li class="liModal">
                  Fill products entry(enter shop content, price, details etc)
                </li>
              </ul>

              <button id="btnStore">
                <router-link to="/openstore"> Open NOW </router-link>
              </button>

              <p class="paraModal mt-8">All right reserved &copy; 2006-2021</p>
              <p class="paraModal mt-1">
                All rights and ownership of stores are legally under the supervision of
                Jumga group of companies <br />
                and regulations of the federal Government of Nigeria.
              </p>
            </article>
          </div>
          <div class="modal-footer">
            <h3>Modal Footer</h3>
          </div>
        </div>
      </div>

      <section
        class="flex justify-around flex-wrap w-full h-full md:mt-auto md:mb-auto items-center"
      >
        <article class="self-start md:pl-20 pl-3 my-auto mx-0">
          <span id="spanLine"></span>
          <h4 class="md:text-sm text-xs font-medium text-justify mt-1 md:mt-4">
            THIS IS JOMEG
          </h4>
          <h1 class="md:text-5xl font-sans text-3xl text-justify mt-2 md:mt-6">
            The World First's & Best <br />
            Online Store<sup class="md:text-xl text-sm">TM</sup><br />
            Platform
          </h1>

          <p class="text-gray-600 mt-6 text-justify">
            We connect you to the world as we provide
          </p>
          <p class="text-gray-600 mt-0 text-justify">
            you with top sales & easy payment

            <small @click="close" class="ownStore text-white cursor-pointer"
              >open a store</small
            >
          </p>
        </article>

        <section
          v-bind:class="{ imgLandPage: mouseover }"
          @mouseleave="startInterval"
          @mouseenter="stopInterval"
        >
          <section
            class="text-center"
            v-for="k in values"
            :key="k.no"
            v-show="k.no === slideNo"
          >
            <img :src="k.url" alt="" style="height: 23.5rem; width: 30rem" />
            <p>{{ k.title }}</p>
            <p>
              <b>$ {{ k.price }} </b>
            </p>
            <button
              id="btnSignUp"
              class="mr-2 list-none font-semibold font-sans cursor-pointer"
            >
              <router-link to="/store/gino@gmail.com"> Buy now</router-link>
            </button>
            <spam class="text-gray-100 cursor-pointer opacity-50 hover:opacity-100">
              <router-link to="/store/gino@gmail.com"> / view store </router-link>
            </spam>
          </section>
        </section>
      </section>

      <section
        class="flex justify-around mt-0 mb-12 md:hidden items-center w-screen"
        id="authLinksMobile"
      >
        <router-link to="/dashboard">
          <li class="list-none font-semibold">Login</li>
        </router-link>
        <router-link to="/dashboard">
          <li id="btnSignUp" class="list-none font-semibold font-sans">Sign up</li>
        </router-link>
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import { computed, reactive, readonly, toRefs, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {
    NavBar,
  },
  setup() {
    const Logo = require("../assets/img/myl.png");
    const ModalPic = require("../assets/img/girl.png");
    const state = reactive({
      modal: false,
      slideNo: 0,
      values: [
        {
          no: 1,
          url: require("../assets/img/shoe1.png"),
          price: "7,893",
          title: "futureX Soles - Whilte/Black",
        },
        {
          no: 2,
          url: require("../assets/img/shoe2.png"),
          price: "1,293",
          title: "AbaROX_2221 - Foreign China wears",
        },
        {
          no: 3,
          url: require("../assets/img/shoe3.png"),
          price: "4,643",
          title: "PlainGins 5500K (exported)",
        },
      ],
      intervalID: "",
      mouseover: true,
    });
    onMounted(() => {
      state.modal = true;
      state.slideNo = state.values[0].no;
      startSlide();
    });

    const close = () => {
      state.modal = !state.modal;
    };

    const startSlide = () => {
      state.intervalID = setInterval(() => {
        state.slideNo = state.slideNo + 1;
        if (state.slideNo > state.values.length) {
          state.slideNo = state.values[0].no;
        }
      }, 4000);
    };

    const stopInterval = () => {
      clearInterval(state.intervalID);
      state.mouseover = !state.mouseover;
    };

    const startInterval = () => {
      startSlide();
      state.mouseover = !state.mouseover;
    };

    return { Logo, ...toRefs(state), ModalPic, close, stopInterval, startInterval };
  },
};
</script>

<style lang="scss" scoped>
.imgLandPage {
  animation: imgLandAnimation 4s infinite;
  transition: 1s ease-in-out;
}

@keyframes imgLandAnimation {
  from {
    transition: 1s ease-in-out;
    transform: translateX(-1rem);
    opacity: 0.2;
  }

  to {
    transition: 1s ease-in-out;
    transform: translateX(0);
    opacity: 1;
  }
}

body {
  font-family: Arial, Helvetica, sans-serif;
}
.divHome {
  height: 100vh;
  @media screen and (max-width: 48rem) {
    height: 200vh;
    background-repeat: repeat;
  }
}
.divTwoHome {
  @media screen and (max-width: 48rem) {
    height: 200vh;
    background-repeat: repeat;
  }
}
.landingProd {
  height: 25%;
  max-width: 50%;
}
/* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fff;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 1.2s;
  animation-name: animatetop;
  animation-duration: 1.2s;
}
.modalPics {
  max-width: 50%;
  height: 22rem;
  border-radius: 1rem;
  @media screen and (max-width: 48rem) {
    display: none;
  }
  @media screen and (min-width: 48rem) {
  }
}

.liModal {
  background: #fbe8c4;
  border-left: 3px solid #1d1300;
  font-weight: 500;
  width: 26rem;
  padding: 0.3rem 0.3rem;
  margin-top: 1.8rem;
  @media screen and (max-width: 48rem) {
    width: 100%;
  }
}
.paraModal {
  color: #656262f2;
  font-size: small;
}
#btnStore {
  background: #865700;
  padding: 0.7rem;
  align-self: center;
  width: 10rem;
  /* margin-left: 1rem; */
  font-weight: 600;
  text-align: center;
  color: white;
  border-radius: 2em;
  cursor: pointer;
  margin-top: 1.75rem;
  outline: none;
  border: none;
}

#btnStore:hover {
  box-shadow: 0.1rem 0.1rem 0.2rem silver;
  transition: cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.5s;
  animation-name: animatetop;
  animation-duration: 0.8s;
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
    transition: cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.5s;
  }
  to {
    top: 0;
    opacity: 1;
    transition: cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.5s;
  }
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

/* The Close Button */
.close {
  color: rgb(105, 105, 105);
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 1px 10px;
  background-color: white;
  color: white;
}

.modal-body {
  padding: 2px 16px;
  @media screen and (max-width: 48rem) {
    flex-direction: column;
  }
}

.modal-footer {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
  display: none;
}
#spanLine {
  display: block;
  background: #08ff00;
  width: 20rem;
  height: 0.5rem;
  border-radius: 5rem;

  @media screen and (max-width: 48rem) {
    width: 12rem;
  }
}
</style>

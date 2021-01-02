<template>
  <div id="container">
    <section class="bg-green-900 h-screen">
      <section class="w-100 h-32 flex justify-center bg-white">
        <img :src="Logo" alt="agrik_io" class="h-20 w-20 self-center" />
      </section>
      <ul id="ulBox" class="mt-3">
        <li class="text-white cursor-pointer font-semibold font-sans" v-for="(navs, _i) in navBtn" :key="_i" @click="switchUI"><i :class="navs.icon"></i> {{ navs.title }}</li>
      </ul>
    </section>

    <section class="bg-blue-200 h-screen" id="rowCon">
      <article style="background-image: url(https://media.giphy.com/media/41fUblVkZ0QForRGrH/giphy.gif)" class="text-white bg-black-700 bg-no-repeat bg-center bg-cover flex flex-col">
        <div class="absolute inset-0 bg-black opacity-75 h-full flex flex-col">
          <h1 class="text-3xl font-sans mt-2 font-medium">Welcome, {{ name }} and {{ greetUser }}</h1>
          <p class="text-gray-500 text-center mt-1">
            How are u doing today? you can seemlessly track <br />
            your progress with agrik_io
          </p>
          <button @click="store.commit('toggleModal', true)" class="btn md:mt-8 mt-20 px-2 outline-none self-center relative py-2 border-none rounded bg-green-500 font-semibold font-sans w-32 text-white text-sm">Enter record</button>
        </div>
      </article>

      <Modal />

      <section id="recBox">
        <section class="bg-white overflow-y-scroll">
          <h2 class="mt-4">
            <span class="pb-1 border-b-2 font-sans font-semibold border-green-500"> Records </span>
          </h2>

          <div id="list-demo">
            <button @click="add">Add</button>
            <button @click="remove">Remove</button>
            <transition-group name="list" tag="p">
              <span v-for="item in items" :key="item" class="list-item">
                {{ item }}
              </span>
            </transition-group>
          </div>

          <div id="demo">
            <input v-model="query" class="bg-red-400" type="text" />
            <transition-group name="staggered-fade" tag="ul" :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
              <li v-for="(item, index) in computedList" :key="item.msg" :data-index="index">
                {{ item.msg }}
              </li>
            </transition-group>
          </div>

          <div class="bg-gray-300 text-gray-800 antialiased min-h-screen flex flex-col justify-end">
            <div class="bg-gray-400 px-8 py-8 flex justify-center">
            <ul>
              <li><a href="">
              
              </a>
              </li>
            </ul>
              <button class="bg-white hover:bg-gray-100 shadow-md border rounded-lg px-4 py-4 flex items-center -mt-16" style="width: 20rem">
                <img src="https://image.freepik.com/free-photo/portrait-happy-woman-smiling_1303-9953.jpg" alt="avatar" class="rounded-full w-10 h-10" />
                <div class="ml-4">
                  <div class="font-semibold font-sans">
                    Hey Email Invite
                    <div class="text-left text-gray-700 font-sans">Jason Erica</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>
        <section class="bg-gray-200">
          <highcharts :options="options" ref="highcharts"></highcharts>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
import { computed, reactive, readonly, toRefs } from "vue";
import { useStore } from "vuex";
import Modal from "@/components/Modal";

export default {
  name: "Dashboard",
  components: {
    Modal,
  },
  setup(props) {
    let store = useStore();
    var vm = this;
    let state = reactive({
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10,
      visible: false,
       

      navBtn: [
        { title: "Profile", icon: "fas fa-user-alt" },
        { title: "Record", icon: "fas fa-record-vinyl" },
        { title: "Support", icon: "fas fa-phone-volume" },
        { title: "Blog", icon: "fas fa-blog" },
      ],
      query: "",
      list: [{ msg: "Bruce Lee" }, { msg: "Jackie Chan" }, { msg: "Chuck Norris" }, { msg: "Jet Li" }, { msg: "Kung Fury" }],
      name: store.getters.getFarmerData("get-name"),
      farmRecs: computed(() => {
        return store.getters.getFarmerData("get-record");
      }),
      computedList: computed(() => state.list.filter((item) => item.msg.toLowerCase().indexOf(state.query.toLowerCase()) !== -1)),
      greetUser: computed(() => {
        let myHrs = new Date().getHours();

        let greet = myHrs < 12 ? "Good morning" : myHrs >= 12 && myHrs <= 17 ? "Good Afternoon" : myHrs >= 17 && myHrs <= 24 ? "Good Evening" : "";

        return greet;
      }),
    });

    const switchUI = (index, label) => {};

    const Logo = require("../assets/img/myl.png");

    function beforeEnter(el) {
      el.style.opacity = 0;
      el.style.height = 0;
    }
    function enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: "1.6em",
        delay: el.dataset.index * 0.15,
        onComplete: done,
      });
    }
    function leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.15,
        onComplete: done,
      });
    }

    function randomIndex() {
      return Math.floor(Math.random() * this.items.length);
    }

    function add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++);
    }

    function remove() {
      this.items.splice(this.randomIndex(), 1);
    }

    return { ...toRefs(state), switchUI, Logo, store, randomIndex, add, remove, beforeEnter, enter, leave };
  },
};
</script>

<style lang="scss">
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: transform 0.8s ease;
}
#container {
  position: relative;
  display: grid;
  grid-template-columns: 15% 85%;
  overflow-x: hidden;

  @media screen and (max-width: 48rem) {
    grid-template-columns: 0% 100%;
  }
}

#rowCon {
  position: relative;
  display: grid;
  grid-template-rows: 35% 65%;

  @media screen and (max-width: 48rem) {
    grid-template-rows: 100%;
  }
}
#ulBox {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  height: 45vh;
}
#recBox {
  position: relative;
  display: grid;
  grid-template-columns: 80% 20%;

  @media screen and (max-width: 48rem) {
    grid-template-columns: 100%;
  }
}

#articleCon {
  width: 15rem;
  height: 18rem;
}
</style>

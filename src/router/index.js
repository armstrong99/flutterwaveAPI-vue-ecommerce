import { createRouter, createWebHistory } from "vue-router";
// import Home from '../views/Home.vue'

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue")
  },

  {
    path: "/pay-confirm",
    name: "PayConfirm",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/PayConfirm.vue")
  },
  {
    path: "/products-setup",
    name: "ProductSetup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/ProductsSetup.vue")
  },
  {
    path: "/openstore",
    name: "OpenStore",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/OpenStore.vue")
  },
  {
    path: "/store/:business_id",
    name: "MyStore",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/MyStore.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "page-not-found",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Page-not-found.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

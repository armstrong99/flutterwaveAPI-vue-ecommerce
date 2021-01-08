import { createStore } from "vuex";

export default createStore({
  state: {
    products: [],
    cart: 2
   },
  mutations: {
    /**
     * Add a new farmer to the test db or state.
     * @param {object} list - The details of the farmer we want to add to the test db.
     * @param {object} state - This is the same state object as the one above.
     */
    addProducts(state, list) {
      state.products = [...state.products, ...list];
    },
    addToCart(state, list) {
      state.cart = state.cart + 1
    }
  },
  getters: {
    getProucts: state => state.products,
    getCartItem: state => state.cart
  },
  actions: {},
  modules: {}
});

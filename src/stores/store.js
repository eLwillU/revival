import { defineStore } from "pinia";

export const userStore = defineStore("counter", {
  state: () => ({
    counter: 0,
    locale: navigator.language
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  actions: {
    increment() {
      this.counter++;
    },
  },
});

import {defineStore} from "pinia";

export const userStore = defineStore("counter", {

  state: () => ({
    locale: navigator.language,

  }),

  getters: {},

  actions: {},
});

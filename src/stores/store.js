import { defineStore } from "pinia";

export const userStore = defineStore("counter", {
  state: () => ({
    locale: navigator.language,
  }),

  getters: {
    getLanguage() {
      return this.locale.split("-")[0];
    },
  },

  actions: {
    setLanguage(language) {
      this.locale = language;
    },
  },
});

import { defineStore } from "pinia";
import { ref } from "vue";

export const userStore = defineStore("counter", {
  state: () => ({
    locale: ref(navigator.language.split("-")[0]),
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

import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const userStore = defineStore("counter", {
  state: () => ({
    locale: ref(navigator.language),
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

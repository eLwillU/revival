import { defineStore } from "pinia";
import { ref } from "vue";
import { QuestionnaireData } from "@i4mi/fhir_questionnaire";

export const userStore = defineStore("user", {
  state: () => ({
    locale: ref(navigator.language.split("-")[0]),
    questionnaireResponse: ref(""),
    currentPage: ref(1),
  }),

  getters: {
    getCurrentPage() {
      return this.currentPage;
    },
    getLanguage() {
      return this.locale.split("-")[0];
    },
    getQuestionnaireResponse() {
      return this.questionnaireResponse;
    },
  },

  actions: {
    setLanguage(language) {
      this.locale = language;
    },
    setQuestionnaireResponse(response) {
      this.questionnaireResponse = response;
    },
  },
});

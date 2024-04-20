import { defineStore } from "pinia";
import { ref } from "vue";
import { QuestionnaireData } from "@i4mi/fhir_questionnaire";

export const userStore = defineStore("user", {
  state: () => ({
    locale: ref(navigator.language.split("-")[0]),
    questionnaireResponse: new QuestionnaireData("", ["de", "fr"]),
  }),

  getters: {
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

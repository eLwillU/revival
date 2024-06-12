import { defineStore } from "pinia";
import { ref } from "vue";

// Set the default language based on the user's browser language, defaulting to 'de' if not 'de' or 'fr'.
let lang = navigator.language.split("-")[0];
if (!(lang === "de" || lang === "fr")) {
  lang = "de";
}

// Define the Pinia store for user-related state management.
export const userStore = defineStore("user", {
  // Define the state properties of the store.
  state: () => ({
    locale: lang,  // Store the current locale, defaulting to the determined language.
    questionnaireResponse: ref(""),  // Reactive property to store the questionnaire response.
    currentPage: ref(1),  // Reactive property to store the current page number.
    isLoggedIn: false,  // Boolean flag to indicate if the user is logged in.
  }),

  // Define getters to access state properties.
  getters: {
    // Get the current page number.
    getCurrentPage() {
      return this.currentPage;
    },
    // Get the current language (without the region part).
    getLanguage() {
      return this.locale.split("-")[0];
    },
    // Get the current questionnaire response.
    getQuestionnaireResponse() {
      return this.questionnaireResponse;
    },
    // Get the login status of the user.
    getIsLoggedIn() {
      return this.isLoggedIn;
    },
  },

  // Define actions to modify state properties.
  actions: {
    // Set the language of the application.
    setLanguage(language) {
      this.locale = language;
    },
    // Set the response for the questionnaire.
    setQuestionnaireResponse(response) {
      this.questionnaireResponse = response;
    },
    // Set the login status of the user, with a console log for debugging.
    setLoginStatus(status) {
      console.log(`Updating login status from ${this.isLoggedIn} to ${status}`);
      this.isLoggedIn = status;
    },
  },
});

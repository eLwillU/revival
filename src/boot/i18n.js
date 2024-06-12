import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import DE from "../i18n/DE.json";  // Import German translations
import FR from "../i18n/FR.json";  // Import French translations
import { userStore } from "stores/store";  // Import the user store

// Initialize the user store
const store = userStore();

// Boot file to configure internationalization (i18n) for the application
export default boot(({ app }) => {
  // Create an i18n instance with options
  const i18n = createI18n({
    locale: store.locale,  // Set the default locale based on the user's preference stored in the user store
    messages: {
      fr: FR,  // French translations
      de: DE,  // German translations
    },
    legacy: false,  // Use Composition API for i18n
  });

  // Integrate the i18n instance with the Vue application
  app.use(i18n);
});

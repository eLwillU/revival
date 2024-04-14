import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import DE from "../i18n/DE.json";
import FR from "../i18n/FR.json";
import { userStore } from "stores/store";

const store = userStore();

export default boot(({ app }) => {
  // Create i18n instance with options
  const i18n = createI18n({
    locale: store.locale,
    messages: {
      fr: FR,
      de: DE,
    },
    legacy: false,
  });
  // Set i18n instance on app
  app.use(i18n);
});

import { boot } from "quasar/wrappers";
import moment from "moment";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  // Create i18n instance with options

  // Set i18n instance on app
  app.use(moment);
});

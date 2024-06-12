import { JSOnFhir } from "@i4mi/js-on-fhir";

// Initialize the JSOnFhir instance with configuration settings.
const fhir = new JSOnFhir(
  "https://test.midata.coop",  // Base URL of the FHIR server.
  "revival",  // Client ID for the FHIR server.
  "http://localhost:9000/#/welcome",  // Redirect URI after authentication.
  {
    disablePkce: false,  // PKCE (Proof Key for Code Exchange) is enabled for enhanced security.
    doesNotNeedAuth: false,  // Authentication is required.
  }
);

// Export a function to integrate JSOnFhir with the Vue.js application.
export default ({ app }) => {
  // Add the FHIR instance to the global properties of the Vue application.
  app.config.globalProperties.$fhir = fhir;
};

// Export the FHIR instance for use in other parts of the application.
export { fhir };

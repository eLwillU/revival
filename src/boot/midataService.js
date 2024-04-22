import { JSOnFhir } from "@i4mi/js-on-fhir";

const fhir = new JSOnFhir("revival", "http://localhost:9000/#/welcome", {
  disablePkce: false,
  doesNotNeedAuth: false,
});

export default ({ app }) => {
  app.config.globalProperties.$fhir = fhir;
};

export { fhir };

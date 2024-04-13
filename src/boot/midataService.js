import { JSOnFhir } from "@i4mi/js-on-fhir";

const fhir = new JSOnFhir(
  "https://test.midata.coop",
  "revival",
  "http://localhost:9000/#/cards",
  {
    disablePkce: false,
    doesNotNeedAuth: false,
  }
);

export default ({ app }) => {
  app.config.globalProperties.$fhir = fhir;
};

export { fhir };

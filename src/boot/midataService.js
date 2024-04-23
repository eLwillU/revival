import { JSOnFhir } from "@i4mi/js-on-fhir";

const fhir = new JSOnFhir(
  "https://test.midata.coop",
  "revival",
  "https://www.revival-prems.ch/#/welcome",
  {
    disablePkce: false,
    doesNotNeedAuth: false,
  }
);

export default ({ app }) => {
  app.config.globalProperties.$fhir = fhir;
};

export { fhir };

import { QuestionnaireData } from "@i4mi/fhir_questionnaire";

export async function fetchData() {
  var qData = "";
  fetch("questionnaire/type.json")
    .then((response) => response.json())
    .then((res) => {
      qData = new QuestionnaireData(res, ["de"]);
      console.log("Qdata: ", qData);
      return qData;
    })
    .catch((error) => {
      console.error("Error loading the JSON file:", error);
    });
}

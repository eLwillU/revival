<template>
  <q-page>
    <h4>Page 2</h4>
  </q-page>
</template>

<script setup>
import { QuestionnaireData } from "@i4mi/fhir_questionnaire";
import { ref } from "vue";

const url = "../jsonFiles/scape-questionnaire.fhir.json";
const data = ref("");
const qData = ref(new QuestionnaireData("", ["de"]));

async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    data.value = await response.json();
    qData.value = new QuestionnaireData(data.value, ["de"]);
    console.log("qdata", qData.value);
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}
fetchData();
console.log("start");
setTimeout(function () {
  console.log("End");
}, 10000);
</script>

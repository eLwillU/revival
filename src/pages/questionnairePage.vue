<script setup>
import { ref } from "vue";
import { FQRenderer } from "@i4mi/fhir-questionnaire-renderer";
import { QuestionnaireData } from "@i4mi/fhir_questionnaire";

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

// IMPORTANT!!! The QuestionnaireData should be wrapped in a ref.

function save() {
  // SEE to @i4mi/fhir_questionnaire documentation.
}

function reset() {
  // SEE to @i4mi/fhir_questionnaire documentation.
}
</script>
<template>
  <FQRenderer
    :questionnaire-data="qData"
    language="de"
    :translation-strings="{
      /* TranslationStrings object */
    }"
  />
</template>

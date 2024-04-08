<template>
  <FQRenderer
    :questionnaire-data="qData"
    :language="language"
    :translation-strings="{
      /* TranslationStrings object */
    }"
  />

  <q-btn @click="logLanguage">Log lang</q-btn>
</template>

<script setup>
import { ref } from "vue";
import { FQRenderer } from "@i4mi/fhir-questionnaire-renderer";
import { QuestionnaireData } from "@i4mi/fhir_questionnaire";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
import { userStore } from "src/stores/store";

const store = userStore();

console.log("sotre lang ", i18n.locale);

const language = "de";

const url = "../jsonFiles/prod Effort Questionnaire.json";
const data = ref("");
const qData = ref(new QuestionnaireData("", [language]));

console.log("lang: ", language);
async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    data.value = await response.json();
    qData.value = new QuestionnaireData(data.value, [language]);
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

function logLanguage() {
  console.log(language);
}
</script>

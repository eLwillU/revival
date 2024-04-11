<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="text-body2 text-weight-medium text-justify q-py-sm">
          Titel der Frage
        </div>
        <q-select label="Standard" outlined dense />
      </q-card-section>
    </q-card>

    <FQRenderer
      :key="$i18n.locale"
      :questionnaire-data="qData"
      :language="$i18n.locale.split('-')[0]"
      :translation-strings="{
        /* TranslationStrings object */
      }"
    />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { QuestionnaireData } from "@i4mi/fhir_questionnaire";
import { FQRenderer } from "@i4mi/fhir-questionnaire-renderer";
const url = "../jsonFiles/scape-copy.json";
const data = ref("");
const qData = ref(new QuestionnaireData("", ""));

async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    data.value = await response.json();
    qData.value = new QuestionnaireData(data.value, ["de-CH", "fr-CH"]);
    console.log("qdata", qData.value);
    console.log("Questions: ", qData.value.getQuestions());
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}
fetchData();
</script>

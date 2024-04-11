<template>
  <q-page>
    <div>
      <div class="q-py-xl">
        <q-btn @click="console.log(qData.getQuestions()[1])"
          >Debug Button</q-btn
        >
      </div>
    </div>
    <div v-for="question in qData.getQuestions()" :key="question.id">
      <q-card>
        <q-card-section>
          <div class="text-body2 text-weight-medium text-justify q-py-sm">
            {{ question.id }}
            {{ question.label[$i18n.locale.split("-")[0]] }}
          </div>
        </q-card-section>

        <q-card-section>
          <div
            v-for="answerOption in question.answerOptions"
            :key="answerOption.code"
          >
            <q-radio label="answerOption.answer['de']"></q-radio>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { QuestionnaireData } from "@i4mi/fhir_questionnaire";
const url = "../jsonFiles/scape-copy.json";
const data = ref("");
const qData = ref(new QuestionnaireData("", ["de", "fr"]));
async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    data.value = await response.json();
    qData.value = new QuestionnaireData(data.value, ["de", "fr"]);
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}
fetchData();
</script>

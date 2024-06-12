<template>
  <div v-if="dataReady">
    <q-card>
      <q-card-section>
        <div v-for="q in qData.getQuestions()" :key="q.id">
          <QuestionComponent :qData="qData" :question=q></QuestionComponent>
        </div>
      </q-card-section>
    </q-card>
    <q-btn @click="console.log(qData.getQuestionnaireResponse('de'))">Log Response</q-btn>
  </div>

</template>

<script setup>
import {ref} from "vue";

const qData = ref();
const dataReady = ref(false);

const selectedAnswer = ref("");
const selectedAnswers = ref([]);
const stringAnswer = ref("");
import {QuestionnaireData} from "@i4mi/fhir_questionnaire";
import QuestionComponent from "components/QuestionComponent.vue";

fetch("questionnaire/scape_complete.json")
  .then((response) => response.json())
  .then((res) => {
    qData.value = new QuestionnaireData(res, ["de"]);
    dataReady.value = true;
  })
  .catch((error) => {
    console.error("Error loading the JSON file:", error);
  });
</script>

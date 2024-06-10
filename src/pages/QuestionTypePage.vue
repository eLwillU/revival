<template>
  <div v-if="dataReady">
    <q-card>
      <q-card-section>
        <div v-for="q in qData.getQuestions()" :key="q.id">
          <div v-if="q.isEnabled">
            <QuestionComponent :qData="qData" :question=q></QuestionComponent>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-btn @click="logggg">Log whole res</q-btn>
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
import QuestionComponent from "components/QuestionTypes/QuestionComponent.vue";

fetch("questionnaire/scape_complete.json")
  .then((response) => response.json())
  .then((res) => {
    qData.value = new QuestionnaireData(res, ["de"]);
    dataReady.value = true;
  })
  .catch((error) => {
    console.error("Error loading the JSON file:", error);
  });

function updateQuestionAnswers(q, answer) {
  qData.value.updateQuestionAnswers(q, answer);
}

function updateTextQuestion(question, answer) {
  const res = {
    answer: {},
    code: {},
  };
  res.code.valueString = answer;
  res.answer["de"] = answer;
  qData.value.updateQuestionAnswers(question, res);
}

function logggg() {
  try {
    const response = qData.value.getQuestionnaireResponse("de");
    console.log(response);
  } catch (e) {
    console.warn("Something ain't right:", e);
  }
}
</script>

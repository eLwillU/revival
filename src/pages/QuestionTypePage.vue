<template>
  <div v-if="dataReady">
    <q-card>
      <q-card-section>

        <div v-for="q in qData.getQuestions()" :key="q.id">
          <div v-if="q.isEnabled">
            <div v-if="q.type === 'choice'">
              <h6>
                {{ q.prefix }}. {{ q.label["de"] }}
              </h6>
              <div
                v-for="answer in q.answerOptions"
                :key="q.id + '-' + answer.code"
              >
                <q-radio
                  v-if="!q.allowsMultipleAnswers"
                  v-model="selectedAnswer"
                  :label="answer.answer['de']"
                  :val="answer.answer['de']"
                  @update:model-value="() => updateQuestionAnswers(q, answer)"
                ></q-radio>
                <q-checkbox
                  v-if="q.allowsMultipleAnswers"
                  v-model="selectedAnswers"
                  :label="answer.answer['de']"
                  :val="answer.answer['de']"
                  @update:model-value="() => updateQuestionAnswers(q, answer)"
                ></q-checkbox>
              </div>
              <template v-for="qSub in q.subItems" :key="qSub.id">
                <div v-if="qSub.isEnabled">
                  <q-input v-model="stringAnswer" outlined></q-input>
                  <q-btn @click="updateTextQuestion(qSub, stringAnswer)"
                  >Submit
                  </q-btn
                  >
                  <q-btn @click="logggg()"> Log response</q-btn>
                </div>
              </template>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import {ref} from "vue";

const qData = ref("");
const dataReady = ref(false);

const selectedAnswer = ref("");
const selectedAnswers = ref([]);
const stringAnswer = ref("");
import {QuestionnaireData} from "@i4mi/fhir_questionnaire";

fetch("questionnaire/output.json")
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
  console.log("Qdata new:", qData.value);
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

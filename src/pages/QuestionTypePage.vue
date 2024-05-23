<template>
  <div v-if="dataReady">
    <q-card>
      <q-card-section>
        <div v-for="q in qData.getQuestions()" :key="q.id">
          <div v-if="q.type === 'choice'">
            <h6>
              {{ q.label["de"] }}
            </h6>
            <div
              v-for="answer in q.answerOptions"
              :key="q.id + '-' + answer.code"
            >
              <q-radio
                v-model="selectedAnswer"
                :label="answer.answer['de']"
                :val="answer.answer['de']"
                @update:model-value="() => updateQuestionAnswers(q, answer)"
              ></q-radio>
            </div>
            <div v-for="qSub in q.subItems" :key="qSub.id">
              <div v-if="qSub.isEnabled">
                <h6>
                  {{ qSub.label["de"] }}
                </h6>
                <q-input v-model="singleAnswer" outlined> </q-input>
                <button @click="send(qSub, singleAnswer)">Submit</button>
                <button
                  @click="console.log(qData.getQuestionnaireResponse('de'))"
                >
                  Log response
                </button>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
const qData = ref("");
const selectedAnswer = ref("");
const singleAnswer = ref("");
import { QuestionnaireData } from "@i4mi/fhir_questionnaire";
const dataReady = ref(false);

fetch("questionnaire/type.json")
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

function send(question, answer) {
  console.log("inputs:", question, answer);
  const res = {
    answer: {},
    code: {},
  };
  res.code.valueString = answer;
  res.answer = answer;
  qData.value.updateQuestionAnswers(question, res);
}
</script>

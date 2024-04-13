<template>
  <q-page>
    <div>
      <div class="q-py-xl">
        <q-btn @click="console.log(qData.getQuestions()[1])"
          >Debug Button</q-btn
        >
        <q-btn @click="updateQuestions()"> Set Questions </q-btn>
        <q-btn @click="logQuestionnaireResponse()">Check</q-btn>
      </div>
    </div>
    <div v-for="question in qData.getQuestions()" :key="question.id">
      <q-card>
        <q-card-section>
          <div class="text-body2 text-weight-medium text-justify q-py-sm">
            {{ question.id }}.
            {{ question.label[language] }}
          </div>
        </q-card-section>
        <q-card-section>
          <div
            v-for="answerOption in question.answerOptions"
            :key="answerOption.code"
          >
            <q-radio
              :label="answerOption.answer[language]"
              :val="answerOption"
              v-model="selectedAnswers[question.id]"
              :onAnswer="qData.updateQuestionAnswers.bind(qData)"
            ></q-radio>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { QuestionnaireData } from "@i4mi/fhir_questionnaire";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const language = ref("");

// Questionnaire Stuff
const url = "../jsonFiles/scape-copy.json";
const data = ref("");
const qData = ref(new QuestionnaireData("", ["de", "fr"]));
const selectedAnswers = ref({});

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

watchEffect(() => {
  language.value = locale.value.split("-")[0];
});

function getResponse() {
  try {
    const response = qData.value.getQuestionnaireResponse("de");
    console.log("respo:", response);
  } catch (e) {
    console.warn("Something ain't right:", e);
  }
}

function updateQuestions() {
  // Iterate over the keys of selectedAnswers
  for (const questionId of Object.keys(selectedAnswers.value)) {
    // Find the question by id
    const question = qData.value.findQuestionById(Number(questionId));
    console.log("question:", question);
    console.log("answer: ", selectedAnswers.value[questionId]);
    // Update the question with the selected answer
    qData.value.updateQuestionAnswers(
      question,
      selectedAnswers.value[questionId]
    );
  }
}
function logQuestionnaireResponse() {
  console.log("resp:", qData.value.getQuestionnaireResponse("de"));
}
</script>

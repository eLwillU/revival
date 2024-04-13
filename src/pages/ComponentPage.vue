<template>
  <q-page>
    <div>
      <div class="q-py-xl">
        <q-btn @click="loginStatus()">Login Status</q-btn>
        <LoginButton></LoginButton>
        <q-btn @click="logQuestionnaireResponse()">Debug Button</q-btn>
        <q-btn @click="sendIt()">SENDER</q-btn>
      </div>
    </div>
    <q-btn @click="previousPage()">Prev</q-btn>
    <q-btn @click="nextPage()">Next</q-btn>

    <div v-if="isDataFetched">
      <q-linear-progress :value="progress"></q-linear-progress>
      <QuestionCard
        :question="qData.getQuestions()[currentPage - 1]"
        :language="language"
        :qDataObject="qData"
        @answer-selected="handleAnswerSelected"
      />
    </div>
  </q-page>
</template>

<script setup>
import LoginButton from "src/components/LoginButton.vue";
import { fhir } from "../boot/midataService"; // adjust the path to your midataService file
import { ref, watchEffect } from "vue";
import { QuestionnaireData } from "@i4mi/fhir_questionnaire";
import { useI18n } from "vue-i18n";
import QuestionCard from "../components/QuestionCard.vue";
const { locale } = useI18n();
const language = ref("");
const isDataFetched = ref(false);
const data = ref("");
const qData = ref(new QuestionnaireData("", ["de", "fr"]));
const selectedAnswers = ref({});
const midataLoginStatus = ref(false);

let refreshToken;
fhir
  .handleAuthResponse()
  .then((res) => {
    midataLoginStatus.value = true;
    // check if the response is not null
    if (res) {
      // we are authenticated
      // ... and can keep refreshToken
      refreshToken = res.refresh_token;
    }
  })
  .catch((err) => {
    // oops, something went wrong
    console.log(err);
  });

const currentPage = ref(1);
const numPages = ref(0);
const progress = ref(0);

function nextPage() {
  if (currentPage.value < numPages.value) {
    currentPage.value++;
    progress.value = currentPage.value / numPages.value;
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    progress.value = currentPage.value / numPages.value;
  }
}

async function fetchData() {
  try {
    data.value = await fhir.getResource(
      "Questionnaire",
      "661a3a74596b5e73d7de473a"
    );
    qData.value = new QuestionnaireData(data.value, ["de", "fr"]);
    numPages.value = qData.value.getQuestions().length;
    isDataFetched.value = true;
    const step = 1 / numPages.value;
    progress.value = step;
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

watchEffect(() => {
  language.value = locale.value.split("-")[0];
});

function getResponse() {
  try {
    const response = qData.value.getQuestionnaireResponse(language.value);
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
  console.log("resp:", qData.value.getQuestionnaireResponse(language.value));
}

function handleAnswerSelected({ question, selectedAnswer }) {
  console.log("Question: ", question, " answer: ", selectedAnswer);
  qData.value.updateQuestionAnswers(question, selectedAnswer);
  if (currentPage.value < numPages.value) {
    currentPage.value++;
  }
}

function logUserID() {
  console.log(fhir.getUserId());
}

function loadQuestionnaire() {
  fhir.getResource("Questionnaire", "661a3a74596b5e73d7de473a");
}

function loginStatus() {
  console.log("Loginstatus: ", fhir.isLoggedIn());
}

function sendIt() {
  console.log("lang:", language.value);
  fhir.create(qData.value.getQuestionnaireResponse(language.value));
}

watchEffect(() => {
  if (midataLoginStatus.value) {
    fetchData();
  }
});
</script>

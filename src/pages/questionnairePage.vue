<template>
  <q-page>
    <div v-if="!fhir.isLoggedIn()"><LoginCard /></div>
    <div v-if="isDataFetched">
      <div class="q-px-sm">
        <q-linear-progress
          :value="progress"
          class="q-mt-sm"
          size="25px"
          color="info"
          rounded
        >
          <div class="absolute-full flex flex-center">
            <q-badge
              >{{ $t("question") }} {{ currentPage }} {{ $t("from") }}
              {{ numPages }}</q-badge
            >
          </div>
        </q-linear-progress>
      </div>
      <QuestionCard
        :question="qData.getQuestions()[currentPage - 1]"
        :language="language"
        :qDataObject="qData"
        :error="error"
        @answer-selected="handleAnswerSelected"
      />

      <div class="row justify-between q-px-sm">
        <q-btn
          @click="previousPage()"
          color="primary"
          :disable="currentPage === 1"
          >{{ $t("back") }}</q-btn
        >

        <q-btn
          @click="nextPage()"
          v-if="numPages !== currentPage"
          color="primary"
          :disable="error"
          >{{ $t("next") }}</q-btn
        >
        <q-btn to="/complete" v-if="numPages === currentPage" color="green-5">{{
          $t("completeQuestionnaire")
        }}</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import LoginCard from "../components/LoginCard.vue";
import { fhir } from "../boot/midataService";
import { ref, watchEffect } from "vue";
import { QuestionnaireData } from "@i4mi/fhir_questionnaire";
import { useI18n } from "vue-i18n";
import QuestionCard from "../components/QuestionCard.vue";
import { userStore } from "src/stores/store";
const store = userStore();
const { locale } = useI18n();
const language = ref("");
const isDataFetched = ref(false);
const data = ref("");
const qData = ref(store.getQuestionnaireResponse);
const selectedAnswers = ref({});
const midataLoginStatus = ref(false);
const userInput = ref(false);
let refreshToken;
fhir
  .handleAuthResponse()
  .then((res) => {
    midataLoginStatus.value = true;
    if (res) {
      refreshToken = res.refresh_token;
    }
  })
  .catch((err) => {
    console.log(err);
  });

const currentPage = ref(1);
const numPages = ref(0);
const progress = ref(0);

const tempBoolean = ref(false);
const error = ref(false);
function nextPage() {
  if (!tempBoolean.value) {
    error.value = true;
  } else {
    if (currentPage.value < numPages.value) {
      currentPage.value++;
      progress.value = currentPage.value / numPages.value;
      tempBoolean.value = false;
      error.value = false;
    }
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
    data.value = await fhir.search(
      "Questionnaire",
      "url=http://www.krebsliga.ch/prem/SCAPE-CH"
    );
    const resource = data.value.entry[0].resource;
    console.log("data:", resource);
    qData.value = new QuestionnaireData(resource, ["de", "fr"]);
    numPages.value = qData.value.getQuestions().length;
    isDataFetched.value = true;
    const step = 1 / numPages.value;
    progress.value = step;
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

// Watcher if user is logged in to midata.
watchEffect(() => {
  if (midataLoginStatus.value) {
    fetchData();
  }
});

watchEffect(() => {
  language.value = locale.value.split("-")[0];
});

// TODO: Remove Console.log when done debugging
function getResponse() {
  try {
    const response = qData.value.getQuestionnaireResponse(language.value);
    fhir.create(qData.value.getQuestionnaireResponse(language.value));
    console.log("respo:", response);
  } catch (e) {
    console.warn("Something ain't right:", e);
  }
}

// TODO: delete maybe, might not be needed anymore
function updateQuestions() {
  for (const questionId of Object.keys(selectedAnswers.value)) {
    const question = qData.value.findQuestionById(Number(questionId));
    console.log("question:", question);
    console.log("answer: ", selectedAnswers.value[questionId]);
    qData.value.updateQuestionAnswers(
      question,
      selectedAnswers.value[questionId]
    );
  }
}

// Set question and answer when selected in the component
function handleAnswerSelected({
  question,
  selectedAnswer,
  userSelectedAnswer,
}) {
  qData.value.updateQuestionAnswers(question, selectedAnswer);
  tempBoolean.value = true;
  store.setQuestionnaireResponse(qData.value);
  if (error.value) {
    error.value = false;
  }
}

// Debugging functions
// TODO: remove when done
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

console.log("numpages: ", numPages.value);
console.log("currentpage: ", currentPage.value);
</script>

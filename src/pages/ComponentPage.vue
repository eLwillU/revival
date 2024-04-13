<template>
  <q-page>
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
        @answer-selected="handleAnswerSelected"
      />

      <div class="row justify-between q-px-sm">
        <q-btn @click="previousPage()" color="primary">{{ $t("back") }}</q-btn>
        <q-btn @click="nextPage()" color="primary">{{ $t("next") }}</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup>
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

// Watcher if user is logged in to midata.
watchEffect(() => {
  if (midataLoginStatus.value) {
    fetchData();
  }
});

// Watcher for the language
watchEffect(() => {
  language.value = locale.value.split("-")[0];
});

// TODO: Remove Console.log when done debugging
function getResponse() {
  try {
    const response = qData.value.getQuestionnaireResponse(language.value);
    console.log("respo:", response);
  } catch (e) {
    console.warn("Something ain't right:", e);
  }
}

// TODO: delete maybe, might not be needed anymore
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

// Set question and answer when selected in the component
function handleAnswerSelected({ question, selectedAnswer }) {
  qData.value.updateQuestionAnswers(question, selectedAnswer);
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
</script>

<template>
  <q-page>
    <div v-if="!fhir.isLoggedIn()"><LoginCard /></div>
    <div v-if="isDataFetched">
      <div class="q-px-sm">
        <q-linear-progress
          :value="progress"
          class="q-mt-sm"
          size="25px"
          color="grey-7"
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
        :key="currentPage - 1"
        :question="qData.getQuestions()[currentPage - 1]"
        :language="language"
        :qDataObject="qData"
        :error="error"
        :selectedAnswers="
          qData.getQuestions()[currentPage - 1].selectedAnswers[0]
        "
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
        <q-btn
          to="/complete"
          @click="fhir.create(qData.getQuestionnaireResponse(language))"
          v-if="numPages === currentPage"
          color="green-5"
          >{{ $t("completeQuestionnaire") }}</q-btn
        >
      </div>
    </div>
  </q-page>
</template>

<script setup>
import LoginCard from "../components/LoginCard.vue";
import { fhir } from "../boot/midataService";
import { ref, watchEffect, onMounted } from "vue";
import { QuestionnaireData } from "@i4mi/fhir_questionnaire";
import { useI18n } from "vue-i18n";
import QuestionCard from "../components/QuestionCard.vue";
import { userStore } from "src/stores/store";
const store = userStore();
const { locale } = useI18n();
const language = ref("");
const isDataFetched = ref(false);
const data = ref("");
const qData = ref("");
const midataLoginStatus = ref(false);
const existingQdata = ref(false);
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

const currentPage = ref(store.currentPage);
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
      store.currentPage++;
      progress.value = currentPage.value / numPages.value;
      tempBoolean.value = false;
      error.value = false;
    }
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    store.currentPage--;
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
  if (midataLoginStatus.value && !existingQdata.value) {
    fetchData();
  }
});

watchEffect(() => {
  language.value = locale.value.split("-")[0];
});

// Set question and answer when selected in the component
function handleAnswerSelected({
  question,
  selectedAnswer,
  userSelectedAnswer,
}) {
  qData.value.updateQuestionAnswers(question, selectedAnswer);
  userStore.questionnaireResponse = qData.value;
  tempBoolean.value = true;
  if (error.value) {
    error.value = false;
  }
}

onMounted(() => {
  const storedQuestionnaireData = userStore.questionnaireResponse;
  if (storedQuestionnaireData) {
    isDataFetched.value = true;
    qData.value = storedQuestionnaireData;
    existingQdata.value = true;
    numPages.value = qData.value.getQuestions().length;
    progress.value = currentPage.value / numPages.value;
  }
});
</script>

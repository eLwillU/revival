<!--
This is the main page rendering the question items according to the fhir resource which is being fetched from the MIDATA-FHIR-API.

-->

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
          v-if="numPages === currentPage"
          :label="$t('completeQuestionnaire')"
          color="green-5"
          @click="confirm = true"
        />
        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <div class="text-subtitle1 text-weight-bold">
                {{ $t("confirmEnd") }}
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
              <q-btn
                :label="$t('send')"
                color="green"
                v-close-popup
                @click="fhir.create(qData.getQuestionnaireResponse(language))"
                to="/complete"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import LoginCard from "../components/LoginCard.vue";
import {fhir} from "boot/midataService";
import {onMounted, ref, watchEffect} from "vue";
import {QuestionnaireData} from "@i4mi/fhir_questionnaire";
import {useI18n} from "vue-i18n";
import QuestionCard from "../components/QuestionCard.vue";
import {userStore} from "src/stores/store";

const store = userStore();
const { locale } = useI18n();
const language = ref("");
const isDataFetched = ref(false);
const data = ref();
const qData = ref();
const midataLoginStatus = ref(false);
const existingQdata = ref(false);

const confirm = ref(false);
fhir
  .handleAuthResponse()
  .then((res) => {
    if (res) {
      midataLoginStatus.value = true;
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

// Function to go to the next question / page.
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
// Function to go to the previous question / page.
function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    store.currentPage--;
    progress.value = currentPage.value / numPages.value;
  }
}

onMounted(() => fetchData())

// fetches the questionnaire from MIDATA.
// in this case we use the fhir.search function with some additional params.
// the usage of this method is documented in the official documentation of the js-on-fhir package.
// Additionally the contents of the progress-bar are being calculated to display the progress to the user.
async function fetchData() {
  try {
    data.value = await fhir.search("Questionnaire", {
      url: "http://www.krebsliga.ch/prem/SCAPE-CH",
      version: "1.0",
      status: "active",
    });
    const resource = data.value.entry[0].resource;
    console.log("res;", resource);
    qData.value = new QuestionnaireData(resource, ["de", "fr"]);
    numPages.value = qData.value.getQuestions().length;
    isDataFetched.value = true;
    progress.value = 1 / numPages.value;
    console.log("Questionnaire: ", qData.value);
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

// Watcher if the language changes.
watchEffect(() => {
  language.value = locale.value.split("-")[0];
});

// Set question and answer when selected in the component
function handleAnswerSelected({
  question,
  selectedAnswer
}) {
  qData.value.updateQuestionAnswers(question, selectedAnswer);
  userStore.questionnaireResponse = qData.value;
  tempBoolean.value = true;
  if (error.value) {
    error.value = false;
  }
}


// Initialise the questionnaire data when loading the page
// This is an additional measure to being able to reload progress to the questionnaire which might not have been completed.
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

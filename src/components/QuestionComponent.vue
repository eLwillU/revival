<!-- This is the basic component and styling for displaying the reworked questionnaire with all question types. -->

<template>
  <template v-if="dataReady && props.question.isEnabled">
    <q-card
      class="q-ma-sm"
      flat
      bordered
      :class="{
        'bg-grey-1': !error,
        'bg-red-1': error,
        error: error,
      }"
    >

      <!-- Template for the "display" type -->
      <template v-if="q.type === 'display'">
        <q-card-section :class="questionTitleStyle"
        >{{ q.prefix }}. {{ q.label["de"] }}
        </q-card-section
        >
      </template>

      <!-- Template for the "group" type -->
      <template v-if="q.type === 'group'">
        <q-card-section :class="questionTitleStyle"
        >{{ q.prefix }}. {{ q.label["de"] }}
        </q-card-section
        >
      </template>

      <!-- Template for the "string" type -->
      <template v-if="q.type === 'string'">
        <q-card-section :class="questionTitleStyle">
          {{ q.prefix }}. {{ q.label["de"] }}
        </q-card-section
        >

        <q-card-section>
          <q-input
            v-model="stringAnswer"
            outlined
            placeholder="Ihre Antwort"
          ></q-input>
        </q-card-section>
      </template>

      <!-- Template for the "integer" type -->
      <template v-if="q.type === 'integer'">
        <q-card-section :class="questionTitleStyle"
        >{{ q.prefix }}. {{ q.label["de"] }}
        </q-card-section
        >
        <q-card-section>
          <q-input
            v-model="stringAnswer"
            type="number"
            outlined
            placeholder="Ihre Antwort"
          ></q-input>
        </q-card-section>
      </template>

      <!-- Template for the "choice" type -->
      <template v-if="q.type === 'choice'">
        <q-card-section :class="questionTitleStyle">
          {{ q.prefix }}. {{ q.label["de"] }}
        </q-card-section
        >
        <q-card-section>
          <div
            v-for="answer in q.answerOptions"
            :key="q.id + '-' + answer.code"
          >
            <q-radio
              v-if="!q.allowsMultipleAnswers"
              v-model="selectedAnswer"
              :label="answer.answer['de']"
              :val="answer"
              @update:model-value="() => updateAnswers(props.question, answer)"
            ></q-radio>
            <q-checkbox
              :onAnswer="props.qData.updateQuestionAnswers.bind(qData)"
              v-if="q.allowsMultipleAnswers"
              v-model="selectedAnswers"
              :label="answer.answer['de']"
              :val="answer"
              @update:model-value="() => updateAnswers(props.question, answer)"
            ></q-checkbox>
          </div>
        </q-card-section>
      </template>

      <!-- This part makes the code recursive, so the subitems from the questions are automatically being displayed-->
      <q-card-section v-for="qSub in q.subItems" :key="qSub.id">
        <QuestionComponent
          :qData="props.qData"
          :question="qSub"
        ></QuestionComponent>
      </q-card-section>
    </q-card>
  </template>
</template>

<script setup>
import {onMounted, ref} from "vue";

// Declaring reactive variables for handling component state and props.
const dataReady = ref(false);
const selectedAnswer = ref();
const selectedAnswers = ref([]);
const stringAnswer = ref("");
const error = ref(false);
const questionTitleStyle = "text-body2 text-weight-medium text-justify";
const q = ref();
const props = defineProps({
  question: Object,
  qData: Object,
});


// Initializes the component state once it's mounted.
onMounted(() => {
  q.value = props.question;
  dataReady.value = true;
});


// This function handles the updating of the questions and answers.
// All types besides the string and integer questions.
function updateAnswers(question, answer) {
  props.qData.updateQuestionAnswers(question, selectedAnswer.value);
}

// This function handles the updating of the questions and answers of type string and integer.
function updateTextQuestion(question, answer) {
  const res = {
    answer: {},
    code: {},
  };
  res.code.valueString = answer;
  res.answer["de"] = answer;
  props.qData.updateQuestionAnswers(question, res);
}
</script>

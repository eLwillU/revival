<template>
  <q-page>
    <q-linear-progress :value="count" class="q-mt-md" />
    <QuestionComponent
      :question-text="questions[currentQuestion].questionText"
      :question-title="questions[currentQuestion].questionTitle"
      :answer-options="questions[currentQuestion].answerOptions"
      @answerSelected="print"
    ></QuestionComponent>
    <q-btn @click="previousPage">Zurück</q-btn>
    <q-btn @click="nextPage">Weiter</q-btn>
  </q-page>
</template>

<script setup>
import QuestionComponent from "../components/QuestionComponent.vue";
import { useCounter } from "@vueuse/core";
import { ref } from "vue";

const { count, inc, dec } = useCounter();

function print() {
  console.log("yeeeeting the emit");
}

function nextPage() {
  inc(step);
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++;
  }
}
function previousPage() {
  dec(step);
  if (currentQuestion.value > 0) {
    currentQuestion.value--;
  }
}

const currentQuestion = ref(0);

const question = {
  questionTitle: "Frage 1",
  questionText: "Wie geht es Ihnen?",
  answerOptions: [
    {
      label: "Gut",
      value: "answ1",
    },
    {
      label: "Ok",
      value: "answ2",
    },
    {
      label: "Schlecht",
      value: "answ3",
    },
  ],
};

const question2 = {
  questionTitle: "Frage 2",
  questionText: "Was ist Ihre Lieblingsfarbe?",
  answerOptions: [
    {
      label: "Blau",
      value: "answ1",
    },
    {
      label: "Rot",
      value: "answ2",
    },
    {
      label: "Grün",
      value: "answ3",
    },
    {
      label: "Gelb",
      value: "answ4",
    },
  ],
};

const question3 = {
  questionTitle: "Frage 3",
  questionText: "Welches Tier mögen Sie am meisten?",
  answerOptions: [
    {
      label: "Hund",
      value: "answ1",
    },
    {
      label: "Katze",
      value: "answ2",
    },
    {
      label: "Vogel",
      value: "answ3",
    },
    {
      label: "Fisch",
      value: "answ4",
    },
    {
      label: "Keines",
      value: "answ5",
    },
  ],
};

const questions = [question, question2, question3];

const step = 1 / questions.length;
count.value = step;
</script>

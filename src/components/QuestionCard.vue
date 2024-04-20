<template>
  <div class="q-pa-sm">
    <q-card
      flat
      bordered
      :class="{
        'bg-grey-1': !error,
        'bg-red-1': error,
        error: error,
      }"
    >
      <q-card-section>
        <div class="text-body2 text-weight-medium text-justify">
          {{ question.id }}.
          {{ question.label[language] }}
        </div>
      </q-card-section>
      <q-card-section v-if="error">
        <div class="text-red text-weight-bold">
          Wählen Sie eine Antwort aus...
        </div>
      </q-card-section>
      <q-card-section>
        <div
          v-for="(answerOption, index) in question.answerOptions"
          :key="answerOption.code"
          :class="{ 'q-py-xs': $q.screen.sm }"
        >
          <q-radio
            :label="answerOption.answer[language]"
            :val="answerOption"
            v-model="selectedAnswers"
            @update:modelValue="handleAnswerSelected(selectedAnswers)"
          ></q-radio>
          <div class="q-py-sm">
            <q-separator v-if="index < question.answerOptions.length - 1" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  question: Object,
  language: String,
  qDataObject: Object,
  error: Boolean,
});
const emit = defineEmits(["answer-selected"]);
const userSelectedAnswer = true;
const selectedAnswers = ref(props.question.selectedAnswers[0]);

onMounted(() => {
  selectedAnswers.value = props.question.selectedAnswers;
});

onMounted(() => {
  const code = selectedAnswers.value[0]?.valueCoding?.code;
  if (code) {
    selectedAnswers.value = props.question.answerOptions[code];
    handleAnswerSelected(selectedAnswers.value);
  }
  console.log("Code: ", code || "yeet");
});

function handleAnswerSelected(selectedAnswer) {
  emit("answer-selected", {
    question: props.question,
    selectedAnswer,
    userSelectedAnswer,
  });
}
</script>

<style>
.error {
  border: 1px solid red;
}
</style>

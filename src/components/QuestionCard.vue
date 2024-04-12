<template>
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
          v-model="selectedAnswers"
          @update:modelValue="handleAnswerSelected"
        ></q-radio>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  question: Object,
  language: String,
  qDataObject: Object,
});
const emit = defineEmits(["answer-selected"]);

const selectedAnswers = ref("");

// watchEffect(() => {
//   console.log("Selected answers:", selectedAnswers.value);
// });

function handleAnswerSelected(selectedAnswer) {
  emit("answer-selected", { question: props.question, selectedAnswer });
}
</script>

<template>
  <div class="q-pa-sm">
    <q-card flat bordered class="bg-grey-1">
      <q-card-section>
        <div class="text-body2 text-weight-medium text-justify">
          {{ question.id }}.
          {{ question.label[language] }}
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
            @update:modelValue="handleAnswerSelected"
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
import { ref } from "vue";

const props = defineProps({
  question: Object,
  language: String,
  qDataObject: Object,
});
const emit = defineEmits(["answer-selected"]);
const model = "";
const selectedAnswers = ref("");

function handleAnswerSelected(selectedAnswer) {
  emit("answer-selected", { question: props.question, selectedAnswer });
}
</script>

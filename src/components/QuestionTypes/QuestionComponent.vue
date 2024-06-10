<template>
  <template v-if="dataReady">
    <q-card class="q-ma-sm" flat
            bordered :class="{
        'bg-grey-1': !error,
        'bg-red-1': error,
        error: error,
      }">
      <template v-if="q.type === 'display'">
        <q-card-section :class=questionTitleStyle>{{ q.prefix }}. {{ q.label["de"] }}</q-card-section>
      </template>
      <template v-if="q.type === 'group'">
        <q-card-section :class=questionTitleStyle>{{ q.prefix }}. {{ q.label["de"] }}</q-card-section>
      </template>
      <template v-if="q.type === 'string'">
        <q-card-section :class=questionTitleStyle> {{ q.prefix }}. {{ q.label["de"] }}</q-card-section>

        <q-card-section>
          <q-input v-model=stringAnswer outlined placeholder="Ihre Antwort"></q-input>
        </q-card-section>
      </template>
      <template v-if="q.type === 'integer'">
        <q-card-section :class=questionTitleStyle>{{ q.prefix }}. {{ q.label["de"] }}</q-card-section>
        <q-card-section>
          <q-input v-model=stringAnswer type="number" outlined placeholder="Ihre Antwort"></q-input>
        </q-card-section>
      </template>
      <template v-if="q.type === 'choice'">
        <q-card-section :class=questionTitleStyle> {{ q.prefix }}. {{ q.label["de"] }}</q-card-section>
        <q-card-section>
          <div
            v-for="answer in  q.answerOptions"
            :key="q.id + '-' + answer.code"
          >
            <q-radio
              v-if="!q.allowsMultipleAnswers"
              v-model="selectedAnswer"
              :label="answer.answer['de']"
              :val="answer.answer['de']"
              @update:model-value="() => updateAnswers(q, answer)"
            ></q-radio>
            <q-checkbox
              :onAnswer="props.qData.updateQuestionAnswers.bind(qData)"
              v-if="q.allowsMultipleAnswers"
              v-model="selectedAnswers"
              :label="answer.answer['de']"
              :val="answer.answer['de']"
              @update:model-value="() => updateAnswers(q, answer)"
            ></q-checkbox>
          </div>
        </q-card-section>
      </template>
      <q-card-section v-for="qSub in filteredItems" :key="qSub.id">
        <div v-if="qSub.isEnabled">
          <QuestionComponent :qData=props.qData :question=qSub></QuestionComponent>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn @click="logggg">Log</q-btn>
      </q-card-actions>
    </q-card>
  </template>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import SubQuestionComponent from "components/QuestionTypes/SubQuestionComponent.vue";

const dataReady = ref(false)
const selectedAnswer = ref()
const selectedAnswers = ref([])
const stringAnswer = ref("")
const error = ref(false)
const questionTitleStyle = "text-body2 text-weight-medium text-justify"
const q = ref()
const props = defineProps({
  question: Object,
  qData: Object
})

const filteredItems = ref()
watch(() => q.value.subItems, (newVal) => {
  filteredSubItems.value = newVal;
}, {deep: true});

onMounted(() => {
  q.value = props.question
  dataReady.value = true
})

function updateTextQuestion(q, answer) {
  const res = {
    answer: {},
    code: {},
  };
  res.code.valueString = answer;
  res.answer["de"] = answer;
  props.qData.updateQuestionAnswers(q, res);
}

function updateAnswers(q, answer) {
  props.qData.updateQuestionAnswers(q, answer)
  console.log("Selected: ", q.selectedAnswers)
}

function logggg() {
  console.log("logging something useful")
  console.log("Q data: ", props.qData)
}

</script>

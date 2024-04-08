<template>
  <div class="q-pa-sm">
    <q-card bordered flat class="bg-grey-2">
      <q-card-section>
        <div class="text-h6">{{ props.questionTitle }}</div>
        <div class="text-subtitle2">
          {{ props.questionText }}
        </div>
      </q-card-section>
    </q-card>
    <q-option-group
      v-model="group"
      :options="props.answerOptions"
      color="primary"
    >
      <template v-slot:label="opt">
        <div class="q-py-sm">{{ opt.label }}</div></template
      >
    </q-option-group>

    <q-btn @click="testing">test-Emit</q-btn>
  </div>
</template>

<script setup>
import { ref } from "vue";
const group = ref("op1");

const props = defineProps({
  questionTitle: String,
  questionText: String,
  answerOptions: Array,
});

const options = props.answerOptions;
const emit = defineEmits(["answerSelected"]);
function testing() {
  emit("answerSelected");
}
</script>

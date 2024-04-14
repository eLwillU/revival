<template>
  <div class="q-pa-sm">
    <q-card class="bg-grey-2 border text-red">
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

    <q-btn @click="loque">test-Emit</q-btn>
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

function loque() {
  console.log(group.value);
}

const emit = defineEmits(["answerSelected"]);
function testing() {
  emit("answerSelected");
}
</script>
<style scoped>
.red-border {
  border: 2px solid red;
}
</style>

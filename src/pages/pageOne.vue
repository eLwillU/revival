<template>
  <q-page><QuestionComponent> </QuestionComponent> </q-page>
</template>

<script setup>
import QuestionComponent from "../components/QuestionComponent.vue";
import { useCounterStore } from "../stores/store";
const useStore = useCounterStore();
</script>

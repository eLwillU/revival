<template>
  <q-page class="q-ma-md">
    <div class="text-h4 q-py-sm">Fragebogen</div>
    <div>
      <QuestionComponent></QuestionComponent>
    </div>
    <div class="row justify-between q-py-sm">
      <q-btn outline color="primary">Zurück</q-btn>
      <q-btn outline color="primary">Weiter</q-btn>
    </div>
  </q-page>
</template>

<script setup>
import QuestionComponent from "../components/QuestionComponent.vue";
</script>

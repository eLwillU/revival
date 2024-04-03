<template>
  <q-page>
    <div>{{$t('welcome')}}</div>
    <QuestionComponent></QuestionComponent>
  </q-page>
</template>

<script setup>
import QuestionComponent from "../components/QuestionComponent.vue";
</script>

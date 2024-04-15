<template>
  <q-page padding>
    <div>Hello World</div>
    <q-btn @click="logQuestionnaire()">Log Questionnaire</q-btn>

    <div>Test:</div>
  </q-page>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import { fhir } from "../boot/midataService"; // adjust the path to your midataService file

async function logQuestionnaire() {
  console.log("button pressed");
  await fhir
    .search("Questionnaire", "url=http://www.krebsliga.ch/prem/SCAPE-CH")
    .then((response) => {
      console.log(response);
    });
}

const {
  proxy: { $i18n },
} = getCurrentInstance();
const lang = ref($i18n.locale);
function logLanguage() {
  console.log("Lang: ", lang.value);
}
</script>

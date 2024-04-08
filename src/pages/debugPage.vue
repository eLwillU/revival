<template>
  <q-page padding>
    <div>Hello World</div>
    <q-btn @click="logLanguage">Log Language</q-btn>

    <div>Test:</div>
  </q-page>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";

const {
  proxy: { $i18n },
} = getCurrentInstance();
const lang = ref($i18n.locale);
function logLanguage() {
  console.log("Lang: ", lang.value);
}
</script>

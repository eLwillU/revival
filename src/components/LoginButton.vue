<template>
  <q-btn @click="login" color="primary">{{ buttonText }}</q-btn>
</template>

<script setup>
import { fhir } from "../boot/midataService"; // adjust the path to your midataService file
import { userStore } from "src/stores/store";
const store = userStore();
const props = defineProps({
  buttonText: String,
});

function login() {
  fhir.authenticate({ language: store.locale });
}
</script>

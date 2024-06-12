<!--
This is the login button which can be used to start the authentication process by calling the fhir.authenticate() function.
It takes a prop which is used to display the label of the button. This is necessary since the application is multi-language.
-->


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

<template>
  <q-btn @click="login" color="primary">{{ buttonText }}</q-btn>
</template>

<script setup>
import { fhir } from "../boot/midataService"; // adjust the path to your midataService file

const props = defineProps({
  buttonText: String,
});
function login() {
  fhir.authenticate();
}
</script>

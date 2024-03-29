<template>
  <q-btn @click="login">Login</q-btn>
</template>

<script setup>
import { fhir } from "../boot/midataService"; // adjust the path to your midataService file

function login() {
  fhir.authenticate();
}
</script>

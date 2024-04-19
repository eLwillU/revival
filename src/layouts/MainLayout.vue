<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="text-center">REVIVAL</q-toolbar-title>

        <q-btn
          outline
          class="q-mx-xs"
          style="color: white"
          @click="$i18n.locale = `de-CH`"
          >DE</q-btn
        >
        <q-btn
          outline
          class="q-mx-xs"
          style="color: white"
          @click="$i18n.locale = `fr-CH`"
          >FR</q-btn
        >
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" side="left" overlay>
      <q-item
        icon="person"
        label="Midata"
        :content-inset-level="0.5"
        clickable
        to="/InfoPage"
        class="items-center justify-between text-subtitle1"
        >InfoPage</q-item
      >
      <q-item
        icon="person"
        label="Midata"
        :content-inset-level="0.5"
        clickable
        to="/cards"
        class="items-center justify-between text-subtitle1"
        >Questionnaire</q-item
      >
      <q-item
        icon="person"
        label="Midata"
        :content-inset-level="0.5"
        clickable
        to="/welcome"
        class="items-center justify-between text-subtitle1"
        >Welcome</q-item
      >
    </q-drawer>

    <q-page-container class="q-pa-sm row justify-center gradback">
      <RouterView class="col-md-6"></RouterView>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fhir } from "../boot/midataService"; // adjust the path to your midataService file

import { userStore } from "stores/store";

const store = userStore();

const leftDrawerOpen = ref(false);

const loginStatus = ref(fhir.isLoggedIn());

function changeLanguage(language) {
  store.locale = language;
}

function handle() {
  fhir
    .handleAuthResponse()
    .then((response) => {
      if (response) {
        // check if response is not null - we have to check for this,
        // or we will overwrite the auth token every time when reloading the component

        // when we get to here, we are authenticated
        console.log("logged in?", fhir.isLoggedIn()); // see?

        let refreshToken = response.refresh_token;
        // keep this refreshToken in a safe place
        // e.g. on a post-it attached to your screen ;-)
      }
    })
    .catch((err) => {
      // if something went wrong, we end up here
      console.log(err);
    });
}

onMounted(handle);

function login() {
  fhir.authenticate();
  loginStatus.value = fhir.isLoggedIn();
}

function logout() {
  fhir.logout();
  console.log(fhir.isLoggedIn());
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<style>
.gradback {
  background-image: radial-gradient(
    circle farthest-corner at 1.3% 2.8%,
    rgba(239, 249, 249, 1) 0%,
    rgba(182, 199, 226, 1) 100.2%
  );
}
</style>

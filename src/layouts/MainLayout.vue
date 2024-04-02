<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          label="Menü"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="text-center"> Revival</q-toolbar-title>
        <q-btn v-if="!loginStatus" flat label="Login" @click="login" />
        <q-btn v-if="loginStatus" flat label="Logout" @click="logout" />
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" side="left" overlay>
      <q-item
        icon="person"
        label="Midata"
        :content-inset-level="0.5"
        clickable
        to="/pageOne"
        class="items-center justify-between text-subtitle1"
        >Item 1</q-item
      >
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
        to="/Questionnaire"
        class="items-center justify-between text-subtitle1"
        >Questionnaire</q-item
      >
    </q-drawer>

    <q-page-container class="q-pa-sm row justify-center">
      <RouterView class="col-md-6"></RouterView>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fhir } from "../boot/midataService"; // adjust the path to your midataService file

const leftDrawerOpen = ref(false);

const loginStatus = ref(fhir.isLoggedIn());

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

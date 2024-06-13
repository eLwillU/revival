<!--
This is the main layout of the application.
It is composed using a q-layout component which has a toolbar and a drawer menu.
Furthermore it contains the "router-view" which enables the application to render the according pages
-->

<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat icon="menu" label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-center">REVIVAL</q-toolbar-title>
        <q-btn color="white" flat icon="settings">
          <q-menu>
            <q-list>
              <q-item clickable>
                <q-item-section>{{ $t("language") }}</q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>
                <q-menu anchor="top end" self="top start">
                  <q-list class="row justify-center">
                    <q-item clickable @click="$i18n.locale = `de-CH`">
                      <q-item-section>DE</q-item-section>
                    </q-item>
                    <q-item clickable @click="$i18n.locale = `fr-CH`">
                      <q-item-section>FR</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
            </q-list>
            <q-separator />
            <q-item
              v-if="!store.isLoggedIn"
              clickable
              v-close-popup
              @click="login()"
            >
              <q-item-section>Login</q-item-section>
            </q-item>
            <q-item
              v-if="store.isLoggedIn"
              clickable
              v-close-popup
              @click="logout()"
            >
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
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
        >{{ $t("informationPage") }}</q-item
      >
      <q-item
        icon="person"
        label="Midata"
        :content-inset-level="0.5"
        clickable
        to="/welcome"
        class="items-center justify-between text-subtitle1"
        >{{ $t("startingPage") }}</q-item
      >
      <q-item
        icon="person"
        label="Midata"
        :content-inset-level="0.5"
        clickable
        to="/questionnaire"
        class="items-center justify-between text-subtitle1"
        >{{ $t("questionnaire") }}</q-item
      >
      <q-item
        icon="person"
        label="Midata"
        :content-inset-level="0.5"
        clickable
        :href="
          'https://ch.midata.coop/#/public/terms?which=revival-terms-of-use--1.0&lang=' +
          $i18n.locale.split('-')[0]
        "
        class="items-center justify-between text-subtitle1"
        >{{ $t("termsofuse") }}</q-item
      >
      <q-item
        :content-inset-level="0.5"
        clickable
        to="/questionnaireOverview"
        class="items-center justify-between text-subtitle1"
        >Übersicht Fragebogen</q-item
      >
      <q-item
        :content-inset-level="0.5"
        clickable
        to="/feedback"
        class="items-center justify-between text-subtitle1"
        >Feedback</q-item
      >
    </q-drawer>

    <q-page-container class="q-pa-sm row justify-center gradient_background">
      <RouterView class="col-md-6"></RouterView>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fhir } from "boot/midataService";
import { userStore } from "stores/store";

const store = userStore();
const leftDrawerOpen = ref(false);
const loginStatus = ref(fhir.isLoggedIn());

// handle the auth response which is called when the login process has been successful.
function handle() {
  fhir
    .handleAuthResponse()
    .then((response) => {
      if (response) {
        store.setLoginStatus(fhir.isLoggedIn());
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

onMounted(handle);

// Handle login process
function login() {
  fhir.authenticate({ language: store.locale });
  loginStatus.value = fhir.isLoggedIn();
}

// Handle logout process
function logout() {
  fhir.logout();
  store.setLoginStatus(false);
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<style>
/* Gradient style for the background of the pages. */
.gradient_background {
  background-image: radial-gradient(
    circle farthest-corner at 1.3% 2.8%,
    rgba(239, 249, 249, 1) 0%,
    rgba(182, 199, 226, 1) 100.2%
  );
}
</style>

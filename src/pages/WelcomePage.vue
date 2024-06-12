<!--
This page is being displayed to the user after successfully logging in to MIDATA.

-->

<template>
  <q-page>
    <LoginCard v-if="!store.isLoggedIn" />
    <div class="q-py-md row justify-center">
      <q-card v-if="store.isLoggedIn" class="col-sm-8">
        <q-card-section class="text-center">
          <q-icon name="check_circle_outline" size="xl" class="text-green" />
          <div class="text-h6">{{ $t("registerSuccess") }}</div>
        </q-card-section>
        <q-card-section class="text-center"
          >{{ $t("loginSuccess") }}
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="primary" to="/questionnaire">{{
            $t("startButton")
          }}</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>
<script setup>
import LoginCard from "../components/LoginCard.vue";
import { userStore } from "stores/store";
const store = userStore();
</script>

<!--
This Page is being displayed to the users after completing the questionnaire.
Currently it only contains a logout logout button and no further functionallity.
-->

<template>
  <q-page padding>
    <q-card class="q-mb-sm">
      <q-card-section class="text-center">
        <q-icon name="task" size="xl" class="text-green" />
        <div class="text-h6">{{ $t("questionnaireDonePageTitle") }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-center">
          {{ $t("questionnaireDonePageText") }}
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn color="primary" to="/infoPage" @click="fhir.logout()"
          >Logout</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { fhir } from "../boot/midataService";
</script>

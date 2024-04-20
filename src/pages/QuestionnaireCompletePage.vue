<template>
  <q-page padding>
    <q-card class="q-mb-sm">
      <q-card-section class="text-center">
        <q-icon name="task" size="xl" class="text-green" />
        <div class="text-h6">Fragebogen ausgefüllt!</div>
      </q-card-section>
      <q-card-section>
        <div class="text-center">
          Sie haben den Fragebogen erfolgreich ausgefüllt, vielen Dank! Wir
          werden die Daten nun im Rahmen unserer Bachelorarbeit auswerten.
        </div>
      </q-card-section>
      <q-card-actions class="justify-between">
        <q-btn color="primary" to="/questionnaire">Zurück </q-btn>
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

<template>
  <q-page>
    <div v-if="!midataLoginStatus"><LoginCard /></div>
    <div class="q-py-md row justify-center">
      <q-card v-if="midataLoginStatus" class="text-center col-sm-8">
        <q-card-section
          ><q-icon
            name="check_circle_outline"
            size="xl"
            class="text-green q-pb-sm"
          />
          <div class="text-h6">Login/Registrierung erfolgreich</div>
        </q-card-section>
        <q-card-section
          >Sie haben sich erfolgreich eingeloggt oder registriert. Sie können
          nun mit dem Fragebogen beginnen.
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="primary" to="/questionnaire"
            >Fragebogen ausfüllen</q-btn
          >
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import LoginCard from "../components/LoginCard.vue";
import { fhir } from "../boot/midataService";

const midataLoginStatus = ref(false);
let refreshToken;
fhir
  .handleAuthResponse()
  .then((res) => {
    if (res) {
      refreshToken = res.refresh_token;
      midataLoginStatus.value = true;
    }
  })
  .catch((err) => {
    console.log(err);
  });
</script>

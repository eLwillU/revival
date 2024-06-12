<template>
  <!--
  This is the card which is being displayed when the user is not logged in yet.
  -->

  <div class="container">
    <q-card class="card">
      <q-card-section>
        <div class="text-h4 text-weight-thin">Login</div>
        <div class="text-body1">
          {{ $t("loginCardText") }}
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-actions>
        <q-btn
          @click="connect()"
          class="midata-fade full-width"
          color="primary"
        >
          {{ $t("connectToMidata") }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { fhir } from "src/boot/midataService";
function connect() {
  fhir.authenticate();
}
</script>

<style lang="sass" scoped>
.card
    max-width: 500px

.container
    display: flex
    justify-content: center
    margin-top: 50px
</style>

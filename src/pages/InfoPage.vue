<template>
  <q-page class="q-pa-none">
    <div class="flex justify-center col-6">
      <q-img
        src="https://cdn.prod.www.manager-magazin.de/images/e762e9b2-669c-40fc-a4df-dc28ba89c20b_w960_r1.778_fpx55_fpy59.jpg"
      >
        <div class="absolute-bottom text-center">
          {{ $t("infoCaption") }}
        </div>
      </q-img>
    </div>

    <div>
      <div class="text-h6 q-my-md text-center">{{ $t("infoWelcome") }}</div>
      <div class="text-subtitle2 q-my-md">
        {{ $t("infoText") }}
      </div>
      <div class="video-container q-my-md">
        <q-video
          src="https://www.youtube.com/embed/CvBfHwUxHIk"
          :ratio="16 / 9"
        />
      </div>
    </div>

    <!-- q-cards Container mit zusätzlichem Abstand unten -->
    <div>
      <q-car></q-car>
    </div>

    <div
      class="q-gutter-md row justify-center q-mt-md"
      style="margin-bottom: 3em"
    >
      <div v-for="n in 2" :key="n" class="col-5 col-md-4 col-lg-3 q-mb-md">
        <InformationCard></InformationCard>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import InformationCard from "../components/InformationCard.vue";

// Skript-Bereich, falls nötig
</script>

<style>
.video-container .responsive-video {
  width: 100%;
  height: auto; /* Für ein responsives Video */
}

.my-card {
  max-width: 300px;
  width: 100%;
  margin: auto;
  margin-bottom: 2em;
}

.card-image {
  height: 150px;
  object-fit: cover;
}
</style>

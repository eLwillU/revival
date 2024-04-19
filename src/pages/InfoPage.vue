<template>
  <q-page class="q-pa-none">
    <div>
      <q-btn
        label="Go to Heading 1"
        @click="scrollTo('heading1')"
        color="primary"
      />
      <q-btn
        label="Go to Heading 2"
        @click="scrollTo('heading2')"
        color="secondary"
      />
      <q-btn
        label="Go to Heading 3"
        @click="scrollTo('heading3')"
        color="accent"
      />
    </div>
    <div>
      <q-card class="q-mb-sm">
        <q-img
          src="https://cdn.prod.www.manager-magazin.de/images/e762e9b2-669c-40fc-a4df-dc28ba89c20b_w960_r1.778_fpx55_fpy59.jpg"
        >
          <div class="absolute-bottom text-center">
            {{ $t("infoCaption") }}
          </div>
        </q-img>
        <q-card-section>
          <div class="text-h6" id="heading1">{{ $t("infoWelcome") }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2">
            {{ $t("infoText") }}
          </div>
        </q-card-section>
      </q-card>

      <q-card class="q-mb-sm">
        <q-card-section>
          <div class="text-h6" id="heading2">{{ $t("infoVideo") }}</div>
        </q-card-section>
        <q-card-section>
          <q-video
            src="https://www.youtube.com/embed/qj8r_7lH76c?si=ufz14iosaoqJvF8z"
            :ratio="16 / 9"
          />
        </q-card-section>
      </q-card>
      <q-card class="q-mb-sm">
        <q-card-section>
          <div class="text-h6" id="heading3">{{ $t("moreInfo") }}</div>
        </q-card-section>
        <q-card-section>
          <InformationCard></InformationCard>
        </q-card-section>
      </q-card>
    </div>

    <div><LoginButton></LoginButton></div>
  </q-page>
</template>

<script setup>
import InformationCard from "../components/InformationCard.vue";
import LoginButton from "src/components/LoginButton.vue";
// Skript-Bereich, falls nötig

function scrollTo(id) {
  const element = document.getElementById(id);
  if (element) {
    const headerHeight = 75; // Height of your header, adjust as necessary
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}
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

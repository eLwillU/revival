<template>
  <q-page class="q-pa-none">
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
          <div class="text-subtitle1 text-weight-bold" id="heading1">
            {{ $t("interestedPersonF") }},
            {{ $t("interestedPersonM") }}
          </div>
          <div>
            {{ $t("infoPageIntroText") }}
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1 text-weight-bold">
            {{ $t("infoPageAimTitle") }}
          </div>
          <div>
            {{ $t("infoPageAimText") }}
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1 text-weight-bold">
            {{ $t("infoPageThesisTitle") }}
          </div>
          <div>
            {{ $t("infoPageThesisText") }}
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1 text-weight-bold">
            {{ $t("infoPageRoleTitle") }}
          </div>
          <div>
            {{ $t("infoPageRoleText") }}
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1 text-weight-bold">
            {{ $t("infoPageToDoTitle") }}
          </div>
          <div>
            {{ $t("infoPageToDoText") }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-btn @click="login()">Login</q-btn>
          <LoginButton :button-text="$t('registerNowButton')"></LoginButton>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1 text-weight-bold">
            {{ $t("infoPageMoreTitle") }}
          </div>
          <div class="">
            {{ $t("infoPageMoreText") }}
          </div>
          <div class="row">
            <div class="q-mx-xl q-py-md text-weight-bold">
              Karin Kennel:
              <br />
              <a href="mailto:karin.kennel@students.bfh.ch">
                karin.kennel@students.bfh.ch
              </a>
            </div>
            <div class="q-mx-xl q-py-md text-weight-bold">
              Dominic Willi: <br />
              <a href="mailto:dominic.willi@students.bfh.ch"
                >dominic.willi@students.bfh.ch</a
              >
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div>
            <div class="text-weight-bold">
              {{ $t("infoPageTogether") }}
            </div>
            <div>
              {{ $t("infoPageGreeting") }}
            </div>
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
        /></q-card-section>
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
  </q-page>
</template>

<script setup>
import InformationCard from "../components/InformationCard.vue";
import LoginButton from "src/components/LoginButton.vue";
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

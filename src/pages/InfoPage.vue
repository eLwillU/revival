<template>
  <q-page class="q-pa-none">
    <div v-if="!disableButtons">
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
      <!-- info Text -->
      <q-card class="q-mb-sm">
        <q-img
          src="https://cdn.prod.www.manager-magazin.de/images/e762e9b2-669c-40fc-a4df-dc28ba89c20b_w960_r1.778_fpx55_fpy59.jpg"
        >
          <div class="absolute-bottom text-center">
            {{ $t("infoCaption") }}
          </div>
        </q-img>

        <q-card-section>
          <div class="text-h6 text-weight-bold" id="heading1">
            {{ $t("interestedPerson") }}
          </div>
          <div>
            Wir, Dominic und Karin, sind fast fertig mit unserem Studium in
            Medizininformatik. In unse-rer Bachelorarbeit erarbeiten wir ein
            Projekt, das uns sehr am Herzen liegt: Wir möchten Ihre Stimme und
            Erfahrungen in den Mittelpunkt stellen.
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1 text-weight-bold">Unser Ziel?</div>
          <div class="">
            Wir möchten mit Ihrer Unterstützung und Ihren direkten Erfahrungen
            das Cancer Survivors Support Programm (CSSP) mitgestalten. Das
            Cancer Survivors Support Programm ist ein Pro-jekt der Krebsliga.
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1 text-weight-bold">
            Unsere Bachelorarbeit?
          </div>
          <div class="">
            Der SCAPE-CH-Fragebogen ist ein Fragebogen zur Erfassung von
            Erfahrungen von Krebspati-enten in der Versorgung. Dieser wird
            bereits erfolgreich in der Schweiz eingesetzt. Wir möchten diesen
            Fragebogen digitalisieren und für Sie leicht zugänglich machen.
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1 text-weight-bold">Ihre Rolle?</div>
          <div class="">
            Sie sind der Schlüssel zur Verbesserung der Behandlungsprozesse.
            Denn nur durch Ihre Er-fahrungen kann sichergestellt werden, dass
            die Betreuung genau auf Ihre Bedürfnisse zuge-schnitten ist.
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1 text-weight-bold">Was ist zu tun?</div>
          <div class="">
            Füllen Sie unseren digitalen Fragebogen aus – es dauert ca. 10-15
            Minuten, abhängig von Ihrer Vertrautheit mit Ihrem Mobilgerät.
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold">Mehr erfahren?</div>
          <div class="">
            Schauen Sie unser Video an! Bei Fragen sind wir per E-Mail oder für
            ein Telefonat für Sie da. Sie erreichen uns unter:
          </div>
          <div class="row">
            <div class="q-mx-xl q-py-md">
              Karin Kennel:
              <br />
              <a href="mailto:karin.kennel@students.bfh.ch">
                karin.kennel@students.bfh.ch </a
              ><br />
              <a href="tel:+41 78 909 49 46"> +41 78 909 49 46</a>
            </div>
            <div class="q-mx-xl q-py-md">
              Dominic Willi: <br />
              <a href="mailto:dominic.willi@students.bfh.ch"
                >dominic.willi@students.bfh.ch</a
              >
              <br />
              <a href="tel:+41 78 949 73 81"> +41 78 949 73 81</a>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            Denn am Ende des Tages zählt jede Stimme, jedes Erlebnis und jede
            Hoffnung, um den Weg der Heilung nicht nur zu gehen, sondern
            gemeinsam neu zu gestalten.
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            <div class="text-weight-bold">
              Wir würden uns auf eine Zusammenarbeit freuen.
            </div>
            <br />
            <div>Herzliche Grüsse Dominic Willi und Karin Kennel</div>
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

const disableButtons = true;

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

<template>
  <q-page class="q-pa-none">
    <q-img
      src="https://cdn.prod.www.manager-magazin.de/images/e762e9b2-669c-40fc-a4df-dc28ba89c20b_w960_r1.778_fpx55_fpy59.jpg"
      class="full-width"
      style="height: 25vh;"
    >
      <div class="absolute-bottom custom-caption text-center">
        Lasst uns zusammen die Krebsbehandlung besser machen – Ihre Stimme zählt!
      </div>
    </q-img>

    <div class="q-pa-md text-center q-mt-lg">
      <div class="text-h6 q-my-md">
        Willkommen bei REVIVAL
      </div>
      <div class="text-subtitle2 q-my-md">
        Nutzen Sie jetzt die Gelegenheit, die Zukunft der Krebsbehandlung aktiv mitzugestalten, indem Sie Ihre persönlichen Erfahrungen durch den digitalen SCAPE-Fragebogen teilen. Ihr wertvolles Feedback ist ein Schlüssel zu einer besseren Patientenversorgung und hilft uns, das Gesundheitssystem effektiver zu gestalten. REVIVAL ist mehr als nur ein Studentenprojekt – es ist eine Bewegung, die durch Ihre Teilnahme und Ihr Engagement wächst. Lassen Sie uns gemeinsam handeln, um den Weg für innovative Veränderungen zu ebnen und das Wohl von Krebspatienten zu fördern. Für einen tieferen Einblick und weitere Informationen schauen Sie sich bitte das Video unten an und entdecken Sie, wie auch Sie einen Unterschied machen können. Seien Sie der Wandel, den Sie in der Welt sehen möchten – beginnen wir heute!
      </div>
      <div class="video-container q-my-md">
        <iframe
          class="responsive-video"
          src="https://www.youtube.com/embed/CvBfHwUxHIk"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <!-- q-cards Container mit zusätzlichem Abstand unten -->
    <div class="q-gutter-md row justify-center q-mt-md" style="margin-bottom: 3em;">
      <div v-for="n in 2" :key="n" class="col-5 col-md-4 col-lg-3 q-mb-md">
        <q-card class="my-card">
          <q-img
            class="card-image"
            src="https://questionstar.de/wp-content/uploads/2020/06/fragebogen-img.jpg"
          />
          <q-card-section class="text-center">
            <div class="text-h6">Was ist der SCAPE?</div>
            <p>Der SCAPE-Fragebogen wurde von der Unisanté...</p>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn flat label="Lesen Sie hier weiter" color="primary" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// Skript-Bereich, falls nötig
</script>

<style>
.custom-caption {
  padding: 1em;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}

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

<template>
  <!--
  This is a card to display more information to the user.
  Currently its in a static form leading to the SCAPE-CH Website.
   -->

  <q-card class="my-card">
    <q-img
      class="card-image"
      src="https://questionstar.de/wp-content/uploads/2020/06/fragebogen-img.jpg"
    />
    <q-card-section class="text-center">
      <div class="text-h6">{{ $t("scapeQuestionnaireInfo") }}</div>
      <q-card-actions class="text-center">
        <q-btn
          flat
          :label="$t('SCAPEReadMore')"
          color="primary"
          href="https://www.scape-enquete.ch/"
          target="_blank"
        />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script setup></script>

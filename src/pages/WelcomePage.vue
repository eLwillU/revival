<template>
  <q-page class="flex flex-center">
    <div class="q-py-md">
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h5">{{ $t("loginSuccess") }}</div>
        </q-card-section>
        <q-card-section>
          <div class="q-py-sm text-weight-medium">
            {{ $t("clickToStart") }}
          </div>

          <q-btn color="secondary" to="/cards">{{ $t("startButton") }}</q-btn>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script setup></script>

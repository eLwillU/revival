<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Quasar App </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
      <q-btn to="/pageOne"> Page 1</q-btn>
      <q-btn to="/pageTwo"> Page 2</q-btn>

      <LoginButton></LoginButton>
    </q-header>

    <q-page-container>
      <RouterView></RouterView>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import LoginButton from "src/components/LoginButton.vue";
</script>

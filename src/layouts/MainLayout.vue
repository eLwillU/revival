<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> revival </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay elevated>
      <q-item
        icon="person"
        label="Midata"
        :content-inset-level="0.5"
        clickable
        to="/pageOne"
        class="items-center justify-between text-subtitle1"
        >Item 1</q-item
      >
    </q-drawer>

    <q-page-container> <RouterView></RouterView> </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import PageLinks from "src/components/PageLinks.vue";

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

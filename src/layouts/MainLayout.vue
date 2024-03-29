<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
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

    <q-page-container> </q-page-container>
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

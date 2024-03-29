<template>
  <q-page>
    <h4>Page 1</h4>
    <LoginButton></LoginButton>

    <div>
      <!-- Option 1 -->
      <div>Direct store</div>
      <!-- Read the state value directly -->
      <div>{{ useStore.counter }}</div>
      <!-- Use getter directly -->
      <div>{{ useStore.doubleCount }}</div>

      <!-- Manipulate state directly -->
      <q-btn @click="useStore.counter--">-</q-btn>
      <!-- Use an action -->
      <q-btn @click="useStore.increment()">+</q-btn>
    </div>
  </q-page>
</template>

<script setup>
import LoginButton from "../components/LoginButton.vue";
import { useCounterStore } from "../stores/store";
const useStore = useCounterStore();
</script>

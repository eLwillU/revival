<template>
  <div>Hello World</div>
</template>

<script setup>
const props = defineProps({
  questionID: Number,
  questionTitle: String,
  questionAnswerts: Array,
});
</script>

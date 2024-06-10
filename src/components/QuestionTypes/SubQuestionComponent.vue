<template v-for="qSub in props.subQuestion.subItems" :key="qSub.id">
  <div v-if="qSub.isEnabled">
    <QuestionComponent :qData=qData :question=qSub></QuestionComponent>
  </div>
</template>
<script setup>
import QuestionComponent from "components/QuestionTypes/QuestionComponent.vue";

const props = defineProps({subQuestion: Object, qData: Object})
</script>

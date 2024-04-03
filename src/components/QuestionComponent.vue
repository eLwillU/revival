<template>
  <div>
    <q-card bordered flat class="bg-grey-2">
      <q-card-section>
        <div class="text-h6">Frage 1</div>
        <div class="text-subtitle2">
          Wie oft waren Sie wegen der durch die Krebserkrankung verursachten
          Symptome bei einem/r Hausarzt/-ärztin oder Allgemeinarzt/-ärztin,
          bevor Sie eine:n Spezialisten/-in konsultiert haben?
        </div>
      </q-card-section>
    </q-card>
    <q-option-group v-model="group" :options="options" color="primary">
      <template v-slot:label="opt">
        <div class="q-py-sm">{{ opt.label }}</div></template
      >
    </q-option-group>
  </div>
</template>

<script setup>
import { ref } from "vue";
const group = ref("op1");

const options = [
  {
    label: "Nie – Ich bin direkt zu einem/r Spezialisten/-in gegangen",
    value: "answ1",
  },
  {
    label:
      "Nie – Ich hatte keine Symptome und der Krebs wurde im Rahmen einer Routine-/ Nachuntersuchung oder bei einer Vorsorge-untersuchung entdeckt",
    value: "answ2",
  },
  {
    label: "Ich war 1 oder 2 Mal bei einem/r Arzt/Ärztin",
    value: "answ3",
  },
  {
    label: "Ich war 3 oder 4 Mal bei einem/r Arzt/Ärztin",
    value: "answ4",
  },
  {
    label: "Ich war 5 oder mehr Mal bei einem/r Arzt/ Ärztin",
    value: "answ5",
  },
  {
    label: "Ich weiss es nicht / Ich erinnere mich nicht",
    value: "answ6",
  },
];
</script>

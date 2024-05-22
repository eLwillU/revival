<template>
  <div v-if="dataReady">
    <div v-for="q in qData.getQuestions()" :key="q.id">
      <h6>
        {{ q.label["de"] }}
      </h6>

      <ul>
        <li
          v-for="answer in q.answerOptions"
          :key="q.id + '-' + answer.code"
          @click="updateQuestionAnswers(q, answer)"
        >
          <input
            :type="q.allowsMultipleAnswers ? 'checkbox' : 'radio'"
            :checked="isAnswerOptionSelected(q, answer)"
            :name="q.id"
            :id="answer.code.toString()"
          />
          <label for="answer.code.toString()">
            {{ answer.answer["de"] }}
          </label>
          {{ answer }}
        </li>
        <div v-for="qSub in q.subItems" :key="qSub.id">
          <div v-if="qSub.isEnabled">
            <h6>
              {{ qSub.label["de"] }}
            </h6>
            <input type="text" v-model="answer" />
            <button @click="sendAnswer(qSub, answer)">Submit</button>
            <button @click="console.log(qData.getQuestionnaireResponse('de'))">
              Log response
            </button>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const qData = ref("");
import { QuestionnaireData } from "@i4mi/fhir_questionnaire";
const dataReady = ref(false);
fetch("questionnaire/type.json")
  .then((response) => response.json())
  .then((res) => {
    qData.value = new QuestionnaireData(res, ["de"]);
    dataReady.value = true;
  })
  .catch((error) => {
    console.error("Error loading the JSON file:", error);
  });

function updateQuestionAnswers(q, answer) {
  qData.value.updateQuestionAnswers(q, answer);
}

function isAnswerOptionSelected(q, answer) {
  return qData.value.isAnswerOptionSelected(q, answer);
}

function sendAnswer(qSub, answer) {
  console.log("Ans: ", answer);
  const res = {
    answer: answer,
    code: {
      code: "valueString",
      valueString: answer,
    },
  };
  qData.value.updateQuestionAnswers(qSub, {
    answer: answer,
    code: {
      answer: answer,
      code: "valueString",
      valueString: answer,
    },
  });
  console.log("Qdata after update: ", qData.value);
  console.log("response: ", qData.value.getQuestionnaireResponse("de"));
}
</script>

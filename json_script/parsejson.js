const fs = require("fs");

// Read the questions from object.json file
fs.readFile("object.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading object.json:", err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    const questions = jsonData.questions; // Accessing the questions array
    const result = processQuestions(questions);
    // Write result to result.json file
    fs.writeFile(
      "result.json",
      JSON.stringify(result, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing result to result.json:", err);
        } else {
          console.log("Result saved to result.json successfully.");
        }
      }
    );
  } catch (parseError) {
    console.error("Error parsing object.json:", parseError);
  }
});

function createAnswerOption(fr_answer_text, de_answer_text, index) {
  return {
    valueCoding: {
      code: index,
      display: de_answer_text,
      _display: {
        extension: [
          {
            url: "http://hl7.org/fhir/StructureDefinition/translation",
            extension: [
              {
                url: "lang",
                valueCode: "de",
              },
              {
                url: "content",
                valueString: de_answer_text,
              },
            ],
          },
          {
            url: "http://hl7.org/fhir/StructureDefinition/translation",
            extension: [
              {
                url: "lang",
                valueCode: "fr",
              },
              {
                url: "content",
                valueString: fr_answer_text,
              },
            ],
          },
        ],
      },
    },
  };
}

function createItem(de_question_text, fr_question_text, index) {
  const trimGerman = de_question_text.split(". ")[1];
  const trimFrench = fr_question_text.split(". ")[1];

  return {
    linkId: index + 1,
    prefix: index + 1,
    text: trimGerman,
    _text: {
      extension: [
        {
          url: "http://hl7.org/fhir/StructureDefinition/translation",
          extension: [
            {
              url: "lang",
              valueCode: "de",
            },
            {
              url: "content",
              valueString: trimGerman,
            },
          ],
        },
        {
          url: "http://hl7.org/fhir/StructureDefinition/translation",
          extension: [
            {
              url: "lang",
              valueCode: "fr",
            },
            {
              url: "content",
              valueString: trimFrench,
            },
          ],
        },
      ],
    },
    type: "choice",
    required: true,
    answerOption: [],
  };
}

function processQuestions(questions) {
  const result = [];
  // Loop through questions array
  questions.forEach((question, index) => {
    // Create item for each question
    const item = createItem(
      question.de_question_text,
      question.fr_question_text,
      index
    );
    // Loop through French answer texts and German answer texts arrays
    for (let i = 0; i < question.fr_answer_texts.length; i++) {
      const fr_answer_text = question.fr_answer_texts[i];
      const de_answer_text = question.de_answer_texts[i];
      // Call createAnswerOption function for each answer text pair
      const answerOption = createAnswerOption(
        fr_answer_text,
        de_answer_text,
        i
      );
      // Push answer option to item's answerOption array
      item.answerOption.push(answerOption);
    }
    // Push item to result array
    result.push(item);
  });
  return result;
}

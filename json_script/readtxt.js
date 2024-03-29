const fs = require('fs');
const path = require('path');

// Function to read files from the directory
function readFilesFromDirectory(directory) {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(files);
        });
    });
}

// Function to parse question and answers from a file
function parseFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const lines = data.split('\n').map(line => line.trim());
            const question = lines.shift(); // Remove and get the question
            const answers = lines.filter(line => line !== ''); // Filter out empty lines

            resolve({ question, answers });
        });
    });
}

// Function to group files by their X number
function groupFilesByNumber(files) {
    const groupedFiles = {};
    files.forEach(file => {
        const match = file.match(/(?:French|German)_Question_(\d+)/);
        if (match) {
            const number = match[1];
            if (!groupedFiles[number]) {
                groupedFiles[number] = [];
            }
            groupedFiles[number].push(file);
        }
    });
    return groupedFiles;
}

// Main function to process files and generate JSON
async function processFiles(directory) {
    try {
        const files = await readFilesFromDirectory(directory);
        const groupedFiles = groupFilesByNumber(files);

        const jsonOutput = { questions: [] };

        for (const key in groupedFiles) {
            const fileSet = groupedFiles[key];
            const questionData = {};
            for (const file of fileSet) {
                const filePath = path.join(directory, file);
                const language = file.startsWith('French') ? 'fr' : 'de';
                const { question, answers } = await parseFile(filePath);
                questionData[`${language}_question_text`] = question;
                questionData[`${language}_answer_texts`] = answers;
            }
            jsonOutput.questions.push(questionData);
        }

        // Write JSON data to file
        fs.writeFileSync('object.json', JSON.stringify(jsonOutput, null, 4));
        console.log('JSON data has been saved to object.json');
    } catch (err) {
        console.error('Error:', err);
    }
}

// Run the script
const directory = __dirname; // Assuming the script is located in the same directory as the files
processFiles(directory);

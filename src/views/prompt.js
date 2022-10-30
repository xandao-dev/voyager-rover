const readline = require('readline');

function createPrompt() {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (question) => new Promise((resolve) => readlineInterface.question(question, (answer) => resolve(answer)));
  return { ask };
}

module.exports = { createPrompt };

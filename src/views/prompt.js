const readline = require('readline');
const { ViewError } = require('../errors/view-error.js');

function createPrompt(configs = {}) {
  const readlineInterface =
    configs.readlineInterface ||
    readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

  if (!readlineInterface.question || !readlineInterface.close) {
    throw new ViewError({ message: 'Invalid readline interface', view: 'prompt' });
  }

  const ask = (question) => new Promise((resolve) => readlineInterface.question(question, (answer) => resolve(answer)));
  const close = () => readlineInterface.close();
  return { ask, close };
}

module.exports = { createPrompt };

const { ValidationError } = require('../errors/validation-error.js');

function createPromptValidator() {
  const sanitize = (answer) => answer?.trim() || '';
  const validateRegex = (answer, regex) => {
    if (!regex.test(answer)) {
      throw new ValidationError(`${answer} is not a valid input`);
    }
  };
  const coerce = (answer, types, separator) => {
    const answerList = answer.split(separator);

    if (answerList.length !== types.length) {
      throw new Error('Answer list length mismatch from types coercion length');
    }

    const coercedAnswerList = answerList.map((value, index) => {
      const coercer = types[index];
      return coercer(value);
    });
    return coercedAnswerList;
  };

  const validate = (answer, regex, types, separator = ' ') => {
    const answerSanitized = sanitize(answer);
    validateRegex(answerSanitized, regex);
    const answerListCoerced = coerce(answerSanitized, types, separator);
    return answerListCoerced;
  };
  return { validate };
}

module.exports = { createPromptValidator };

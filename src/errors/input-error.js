class InputError extends Error {
  constructor({ message, view } = {}) {
    super();

    this.name = 'InputError';
    this.message = message;
    this.view = view;
  }
}

module.exports = { InputError };

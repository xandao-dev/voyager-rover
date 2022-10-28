class ViewError extends Error {
  constructor({ message, view } = {}) {
    super();

    this.name = 'ViewError';
    this.message = message;
    this.view = view;
  }
}

module.exports = { ViewError };

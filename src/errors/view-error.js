class ViewError extends Error {
  constructor({ message, view } = {}) {
    super();

    this.name = 'ServiceError';
    this.message = message;
    this.view = view;
  }
}

module.exports = { ViewError };

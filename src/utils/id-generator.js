function createIdGenerator({ initialId = 0 } = {}) {
  validateInitialId(initialId);
  const id = idGenerator(initialId);
  return {
    next: () => id.next().value,
  };
}

function validateInitialId(initialId) {
  if (Number.isInteger(initialId) === false) {
    throw new Error(`Invalid initialId: ${initialId}, it must be an integer`);
  }
  if (initialId < 0) {
    throw new Error(`Invalid initialId: ${initialId}, it must be a positive integer`);
  }
}

function* idGenerator(initialId = 0) {
  let id = initialId;
  yield id;
  while (true) {
    id += 1;
    yield id;
  }
}

module.exports = { createIdGenerator };

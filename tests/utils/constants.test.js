const { roverCommands, cardinalDirections, cardinalDirectionsDegrees } = require('../../src/utils/constants.js');

describe('roverCommands', () => {
  describe('happy path', () => {
    it('is an object', () => {
      expect(roverCommands).toBeInstanceOf(Object);
    });
  });
});

describe('cardinalDirections', () => {
  describe('happy path', () => {
    it('is an object', () => {
      expect(cardinalDirections).toBeInstanceOf(Object);
    });
  });
});

describe('cardinalDirectionsDegrees', () => {
  describe('happy path', () => {
    it('is an object', () => {
      expect(cardinalDirectionsDegrees).toBeInstanceOf(Object);
    });
  });
});

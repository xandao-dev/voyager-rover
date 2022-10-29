const { plateauSizeTypes, roverCommandsTypes, roverPositionTypes } = require('../../src/utils/input-types.js');

describe('plateauSizeTypes', () => {
  describe('happy path', () => {
    it('is an array', () => {
      expect(plateauSizeTypes).toBeInstanceOf(Array);
    });
    it('should have a length of 2', () => {
      expect(plateauSizeTypes).toHaveLength(2);
    });
    it('should be an array of functions', () => {
      expect(plateauSizeTypes[0]).toBeInstanceOf(Function);
      expect(plateauSizeTypes[1]).toBeInstanceOf(Function);
    });
    it('should parse the first value to an integer', () => {
      expect(plateauSizeTypes[0]('1')).toBe(1);
    });
    it('should parse the second value to an integer', () => {
      expect(plateauSizeTypes[1]('1')).toBe(1);
    });
  });
});

describe('roverCommandsTypes', () => {
  describe('happy path', () => {
    it('is an array', () => {
      expect(roverCommandsTypes).toBeInstanceOf(Array);
    });
    it('should have a length of 1', () => {
      expect(roverCommandsTypes).toHaveLength(1);
    });
    it('should be an array of functions', () => {
      expect(roverCommandsTypes[0]).toBeInstanceOf(Function);
    });
    it('should parse the value to a string', () => {
      expect(roverCommandsTypes[0]('1')).toBe('1');
    });
  });
});

describe('roverPositionTypes', () => {
  describe('happy path', () => {
    it('is an array', () => {
      expect(roverPositionTypes).toBeInstanceOf(Array);
    });
    it('should have a length of 3', () => {
      expect(roverPositionTypes).toHaveLength(3);
    });
    it('should be an array of functions', () => {
      expect(roverPositionTypes[0]).toBeInstanceOf(Function);
      expect(roverPositionTypes[1]).toBeInstanceOf(Function);
      expect(roverPositionTypes[2]).toBeInstanceOf(Function);
    });
    it('should parse the first value to an integer', () => {
      expect(roverPositionTypes[0]('1')).toBe(1);
    });
    it('should parse the second value to an integer', () => {
      expect(roverPositionTypes[1]('1')).toBe(1);
    });
    it('should parse the third value to a string', () => {
      expect(roverPositionTypes[2]('1')).toBe('1');
    });
  });
});

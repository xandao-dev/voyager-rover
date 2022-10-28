const { plateauSizeRegex, roverCommandsRegex, roverPositionRegex } = require('../../src/utils/regex.js');

describe('plateauSizeRegex', () => {
  describe('happy path', () => {
    it('should match two space-separated non-negative numbers', () => {
      expect(plateauSizeRegex.test('0 0')).toBe(true);
      expect(plateauSizeRegex.test('10 10')).toBe(true);
      expect(plateauSizeRegex.test('99999 99999')).toBe(true);
    });
  });
  describe('unhappy path', () => {
    it('should not match if the number of elements is different than two', () => {
      expect(plateauSizeRegex.test('0')).toBe(false);
      expect(plateauSizeRegex.test('10')).toBe(false);
      expect(plateauSizeRegex.test('99999')).toBe(false);
      expect(plateauSizeRegex.test('1 2 3')).toBe(false);
      expect(plateauSizeRegex.test('1 2 3 4')).toBe(false);
      expect(plateauSizeRegex.test('1 2 3 4 5')).toBe(false);
    });
    it('should not match two space-separated numbers, with one or both negative', () => {
      expect(plateauSizeRegex.test('-10 10')).toBe(false);
      expect(plateauSizeRegex.test('10 -10')).toBe(false);
      expect(plateauSizeRegex.test('-10 -10')).toBe(false);
    });
    it('should not match letters', () => {
      expect(plateauSizeRegex.test('a')).toBe(false);
      expect(plateauSizeRegex.test('a b')).toBe(false);
      expect(plateauSizeRegex.test('a b c')).toBe(false);
    });
  });
});

describe('roverCommandsRegex', () => {
  describe('happy path', () => {
    it('should match a sequence of one or more [LRM] characters', () => {
      expect(roverCommandsRegex.test('L')).toBe(true);
      expect(roverCommandsRegex.test('R')).toBe(true);
      expect(roverCommandsRegex.test('M')).toBe(true);
      expect(roverCommandsRegex.test('LMRMLMMRMLM')).toBe(true);
      expect(roverCommandsRegex.test('MMMMMMMMMMM')).toBe(true);
    });
  });
  describe('unhappy path', () => {
    it('should not match anything different from [LRM] characters', () => {
      expect(roverCommandsRegex.test('ABC')).toBe(false);
      expect(roverCommandsRegex.test('999')).toBe(false);
      expect(roverCommandsRegex.test('LM1')).toBe(false);
      expect(roverCommandsRegex.test('LM~')).toBe(false);
    });
    it('should not have spaces', () => {
      expect(roverCommandsRegex.test('L M R')).toBe(false);
      expect(roverCommandsRegex.test('L M R M L M')).toBe(false);
    });
  });
});

describe('roverPositionRegex', () => {
  describe('happy path', () => {
    it('should match two space-separated non-negative numbers, followed by a space and a [NESW] character', () => {
      expect(roverPositionRegex.test('0 0 N')).toBe(true);
      expect(roverPositionRegex.test('10 10 E')).toBe(true);
      expect(roverPositionRegex.test('999 999 S')).toBe(true);
      expect(roverPositionRegex.test('99999 99999 W')).toBe(true);
    });
  });
  describe('unhappy path', () => {
    it('should not match if the number of elements is different than three', () => {
      expect(roverPositionRegex.test('0')).toBe(false);
      expect(roverPositionRegex.test('10 10')).toBe(false);
      expect(roverPositionRegex.test('999 S')).toBe(false);
      expect(roverPositionRegex.test('999 999 999 N')).toBe(false);
      expect(roverPositionRegex.test('999 999 W N')).toBe(false);
    });
    it('should not match negative numbers', () => {
      expect(roverPositionRegex.test('-10 10 N')).toBe(false);
      expect(roverPositionRegex.test('10 -10 N')).toBe(false);
      expect(roverPositionRegex.test('-10 -10 N')).toBe(false);
    });
  });
});

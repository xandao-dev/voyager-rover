const { getKeyByValue } = require('../../src/utils/helpers.js');

describe('getKeyByValue', () => {
  describe('happy path', () => {
    it('returns the key of an object given a value', () => {
      const object = { a: 1, b: 2, c: 3 };
      const key = getKeyByValue(object, 2);
      expect(key).toBe('b');
    });
  });
  describe('unhappy path', () => {
    it('returns undefined if the value is not found', () => {
      const object = { a: 1, b: 2, c: 3 };
      const key = getKeyByValue(object, 4);
      expect(key).toBeUndefined();
    });
  });
});

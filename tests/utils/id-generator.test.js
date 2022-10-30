const { createIdGenerator } = require('../../src/utils/id-generator.js');

describe('createIdGenerator', () => {
  describe('happy path', () => {
    it('should return an object with next method', () => {
      const idGenerator = createIdGenerator();
      expect(idGenerator).toHaveProperty('next');
      expect(idGenerator.next).toBeInstanceOf(Function);
    });
    it('should yield an id starting from 0 to 2', () => {
      const idGenerator = createIdGenerator();
      expect(idGenerator.next()).toBe(0);
      expect(idGenerator.next()).toBe(1);
      expect(idGenerator.next()).toBe(2);
      expect(idGenerator.next()).toBe(3);
    });
    it('should yield an id starting from 5 to 7', () => {
      const idGenerator = createIdGenerator({ initialId: 5 });
      expect(idGenerator.next()).toBe(5);
      expect(idGenerator.next()).toBe(6);
      expect(idGenerator.next()).toBe(7);
    });
  });
  describe('unhappy path', () => {
    it('should throw an error if initialId is not an integer', () => {
      expect(() => createIdGenerator({ initialId: 'a' })).toThrow();
    });
    it('should throw an error if initialId is not a positive integer', () => {
      expect(() => createIdGenerator({ initialId: -1 })).toThrow();
    });
  });
});

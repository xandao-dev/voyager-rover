const { createPromptValidator } = require('../../src/views/prompt-validator.js');

let validator;
beforeEach(() => {
  validator = createPromptValidator();
});

describe('createPromptValidator', () => {
  describe('happy path', () => {
    it('should return an object with validate method', () => {
      expect(validator).toHaveProperty('validate');
      expect(validator.validate).toBeInstanceOf(Function);
    });

    describe('validate', () => {
      it('should trim and return an array with one string', () => {
        const stringOnlyRegex = /^[a-zA-Z]+$/;
        const stringOnlyTypes = [(value) => String(value)];

        const result = validator.validate(' hello ', stringOnlyRegex, stringOnlyTypes);
        expect(result).toEqual(['hello']);
        expect(result).toHaveLength(1);
      });

      it('should trim and return an array with one integer', () => {
        const intOnlyRegex = /^\d+$/;
        const intOnlyTypes = [(value) => parseInt(value, 10)];

        const result = validator.validate(' 123 ', intOnlyRegex, intOnlyTypes);
        expect(result).toEqual([123]);
        expect(result).toHaveLength(1);
      });

      it('should trim and return an array with one float', () => {
        const floatOnlyRegex = /^\d+\.\d+$/;
        const floatOnlyTypes = [(value) => parseFloat(value)];

        const result = validator.validate(' 123.456 ', floatOnlyRegex, floatOnlyTypes);
        expect(result).toEqual([123.456]);
        expect(result).toHaveLength(1);
      });

      it('should trim and return an array with two integers', () => {
        const twoIntsRegex = /^\d+\s\d+$/;
        const twoIntsTypes = [(value) => parseInt(value, 10), (value) => parseInt(value, 10)];

        const result = validator.validate(' 123 456 ', twoIntsRegex, twoIntsTypes, ' ');
        expect(result).toEqual([123, 456]);
        expect(result).toHaveLength(2);
      });

      it('should be able to separate by comma if specified', () => {
        const twoIntsRegex = /^\d+,\d+$/;
        const twoIntsTypes = [(value) => parseInt(value, 10), (value) => parseInt(value, 10)];

        const result = validator.validate(' 123,456 ', twoIntsRegex, twoIntsTypes, ',');
        expect(result).toEqual([123, 456]);
        expect(result).toHaveLength(2);
      });
    });
  });

  describe('unhappy path', () => {
    describe('validate', () => {
      it('should throw an error if answer is not a string', () => {
        const stringOnlyRegex = /^[a-zA-Z]+$/;
        const stringOnlyTypes = [(value) => String(value)];

        expect(() => validator.validate(123, stringOnlyRegex, stringOnlyTypes)).toThrow();
        expect(() => validator.validate({ a: 1 }, stringOnlyRegex, stringOnlyTypes)).toThrow();
      });

      it('should throw an error if regex is not a RegExp', () => {
        const stringOnlyTypes = [(value) => String(value)];

        expect(() => validator.validate('hello', 'hello', stringOnlyTypes)).toThrow();
        expect(() => validator.validate('hello', { a: 1 }, stringOnlyTypes)).toThrow();
      });

      it('should throw an error if regex validation fails', () => {
        const stringOnlyRegex = /^[a-zA-Z]+$/;
        const stringOnlyTypes = [(value) => String(value)];

        expect(() => validator.validate('hello 123', stringOnlyRegex, stringOnlyTypes)).toThrow();
      });

      it('should throw an error if length of types is different from the number of elements', () => {
        const stringOnlyRegex = /^[A-Z]+\s[A-Z]+$/;
        const stringOnlyTypes = [(value) => String(value)];

        expect(() => validator.validate('HELLO WORLD', stringOnlyRegex, stringOnlyTypes, ' ')).toThrow();
      });
    });
  });
});

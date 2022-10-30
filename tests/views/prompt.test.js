const { createPrompt } = require('../../src/views/prompt.js');

jest.mock('readline', () => ({
  createInterface: jest.fn(() => ({
    question: jest.fn((_, callback) => callback('Voyager Rover')),
    close: jest.fn().mockReturnValue('close'),
  })),
}));

let prompt;
beforeEach(() => {
  prompt = createPrompt();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('createPrompt', () => {
  describe('happy path', () => {
    it('should return an object with ask and close methods', () => {
      expect(prompt).toHaveProperty('ask');
      expect(prompt).toHaveProperty('close');
      expect(prompt.ask).toBeInstanceOf(Function);
      expect(prompt.close).toBeInstanceOf(Function);
    });

    describe('ask', () => {
      it('should return a promise', () => {
        const result = prompt.ask('What is your name? ');
        expect(result).toBeInstanceOf(Promise);
      });

      it('should resolve the promise with the answer "Voyager Rover"', async () => {
        const result = await prompt.ask('What is your name? ');
        expect(result).toBe('Voyager Rover');
      });

      it('should not throw when call close method', () => {
        expect(() => {
          prompt.close();
        }).not.toThrow();
      });
    });
  });
});

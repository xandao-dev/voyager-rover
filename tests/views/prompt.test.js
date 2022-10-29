const { createPrompt } = require('../../src/views/prompt.js');

describe('createPrompt', () => {
  describe('happy path', () => {
    const readlineInterfaceMock = {
      question: jest.fn((_, callback) => callback('Voyager Rover')),
      close: jest.fn(),
    };

    let prompt;
    beforeEach(() => {
      prompt = createPrompt({ readlineInterface: readlineInterfaceMock });
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should not throw with the original readline interface', () => {
      expect(() => {
        const prompt = createPrompt();
        prompt.close();
      }).not.toThrow();
    });

    it('should return an object with ask and close methods', () => {
      expect(prompt).toHaveProperty('ask');
      expect(prompt).toHaveProperty('close');
      expect(prompt.ask).toBeInstanceOf(Function);
      expect(prompt.close).toBeInstanceOf(Function);
    });

    describe('ask', () => {
      it('should return a promise', () => {
        expect.assertions(1);
        const result = prompt.ask('What is your name? ');
        expect(result).toBeInstanceOf(Promise);
      });

      it('should call readlineInterface.question with the question "What is your name? "', async () => {
        expect.assertions(1);
        await prompt.ask('What is your name? ');
        expect(readlineInterfaceMock.question).toHaveBeenCalledWith('What is your name? ', expect.any(Function));
      });

      it('should resolve the promise with the answer "Voyager Rover"', async () => {
        expect.assertions(1);
        const result = await prompt.ask('What is your name? ');
        expect(result).toBe('Voyager Rover');
      });

      it('should call readlineInterface.question once', async () => {
        expect.assertions(1);
        await prompt.ask('What is your name? ');
        expect(readlineInterfaceMock.question).toHaveBeenCalledTimes(1);
      });
    });

    describe('close', () => {
      it('should call readlineInterface.close once', () => {
        prompt.close();
        expect(readlineInterfaceMock.close).toHaveBeenCalled();
      });
    });
  });

  describe('unhappy path', () => {
    const readlineInterfaceMock = {
      question: undefined,
      close: undefined,
    };

    it('should throw an error if readlineInterface.question or readlineInterface.close is not a function', () => {
      expect(() => createPrompt({ readlineInterface: readlineInterfaceMock })).toThrow();
    });
  });
});

const { createSimulatorController } = require('../../src/controllers/simulator-controller.js');

jest.mock('../../src/views/prompt.js', () => ({
  createPrompt: () => {
    return {
      ask: jest
        .fn()
        .mockReturnValue('invalid input')
        .mockReturnValueOnce('10 10')
        .mockReturnValueOnce('1 2 N')
        .mockReturnValueOnce('LMLMLMLMM'),
      close: jest.fn(),
    };
  },
}));

const simulatorController = createSimulatorController();
describe('createPromptValidator', () => {
  describe('happy path', () => {
    it('should return an object with run method', () => {
      expect(simulatorController).toHaveProperty('run');
      expect(simulatorController.run).toBeInstanceOf(Function);
    });

    describe('run', () => {
      it('should not throw', () => {
        expect(async () => {
          await simulatorController.run();
        }).not.toThrow();
      });
    });
  });
});

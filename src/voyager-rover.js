const { createSimulatorController } = require('./controllers/simulator-controller.js');
(async () => {
  try {
    const simulatorController = createSimulatorController();
    await simulatorController.run();
  } catch (error) {
    console.error(error.message);
  }
})();

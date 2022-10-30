const { createSimulatorController } = require('./controllers/simulator-controller.js');
(async () => {
  try {
    console.log(
      '----------------- Welcome to Voyager Rover -----------------\n',
      'A fictional calculator of final coordinates of a squadron of robotic rovers landed by NASA on a plateau on Mars.\n\n',
      'To start the simulator, follow the instructions below:\n',
      '1. Enter the plateau size, width and height. (e.g. 5 5)\n',
      '2. Enter the rover landing position, x and y coordinates and the direction it is facing (N, S, E, W). (e.g. 1 2 N)\n',
      '3. Enter the movement instructions for the rover L for left, R for right and M for move. (e.g. LMLMLMLMMRM)\n\n',
      'Repeat steps 2 and 3 for as many rovers as you want\n\n',
      'To exit the simulator, press Ctrl + C\n',
      '-------------------------------------------------------------\n'
    );

    const simulatorController = createSimulatorController();
    await simulatorController.run();
  } catch (error) {
    console.error(error.message);
  }
})();

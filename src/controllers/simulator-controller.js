const { createPrompt } = require('../views/prompt.js');
const { createPromptValidator } = require('../views/prompt-validator.js');
const { createPlateauModel } = require('../models/plateau-model.js');
const { createRoverModel } = require('../models/rover-model.js');
const { plateauSizeRegex, roverCommandsRegex, roverPositionRegex } = require('../utils/regex.js');
const { plateauSizeTypes, roverCommandsTypes, roverPositionTypes } = require('../utils/input-types.js');
const { createIdGenerator } = require('../utils/id-generator.js');

function createSimulatorController() {
  const prompt = createPrompt();
  const { validate } = createPromptValidator();
  const idGenerator = createIdGenerator();

  const generatePlateau = async () => {
    while (true) {
      try {
        const plateauSize = await prompt.ask('Plateau Size: ');
        const [plateauEndX, plateauEndY] = validate(plateauSize, plateauSizeRegex, plateauSizeTypes);
        const plateau = createPlateauModel({ endX: plateauEndX, endY: plateauEndY });
        return { plateau };
      } catch (error) {
        console.log(`Error: ${error.message}\n\tFormat: <integer> <integer>\n\tExample: 10 10\n`);
      }
    }
  };
  const landRover = async (plateau) => {
    const id = idGenerator.next();
    while (true) {
      try {
        const roverPosition = await prompt.ask('Landing Position: ');
        const [roverX, roverY, roverDirection] = validate(roverPosition, roverPositionRegex, roverPositionTypes);
        const rover = createRoverModel({ id, pos: { x: roverX, y: roverY, direction: roverDirection } }, plateau);
        plateau.landRover(rover);
        return { rover };
      } catch (error) {
        console.log(`Error: ${error.message}\n\tFormat: <integer> <integer> <direction(NSEW)>\n\tExample: 1 2 N\n`);
      }
    }
  };
  const getRoverCommands = async () => {
    while (true) {
      try {
        const roverCommand = await prompt.ask('Instructions: ');
        const [validRoverCommand] = validate(roverCommand, roverCommandsRegex, roverCommandsTypes);
        const roverCommands = validRoverCommand.split('');
        return { roverCommands };
      } catch (error) {
        console.log(`Error: ${error.message}\n\tFormat: <commands(LMR)>\n\tExample: LMRMLMLMM\n`);
      }
    }
  };
  const showRoverFinalPosition = (rover) => {
    const { x, y, direction } = rover.getPosition();
    console.log(`Final Position: ${x} ${y} ${direction}\n`);
  };
  const run = async () => {
    const { plateau } = await generatePlateau();
    while (true) {
      const { rover } = await landRover(plateau);
      const { roverCommands } = await getRoverCommands(rover);
      rover.sequentialMove(roverCommands);
      showRoverFinalPosition(rover);
    }
  };

  return { run };
}

module.exports = { createSimulatorController };

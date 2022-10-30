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
    const plateauSize = await prompt.ask('Plateau Size: ');
    const [plateauEndX, plateauEndY] = validate(plateauSize, plateauSizeRegex, plateauSizeTypes);
    const plateau = createPlateauModel({ endX: plateauEndX, endY: plateauEndY });
    return { plateau };
  };
  const landRover = async (plateau) => {
    const roverPosition = await prompt.ask('Landing Position: ');
    const [roverX, roverY, roverDirection] = validate(roverPosition, roverPositionRegex, roverPositionTypes);
    const rover = createRoverModel(
      { id: idGenerator.next(), pos: { x: roverX, y: roverY, direction: roverDirection } },
      plateau
    );
    plateau.landRover(rover);
    return { rover };
  };
  const getRoverCommands = async () => {
    const roverCommand = await prompt.ask('Instructions: ');
    const [validRoverCommand] = validate(roverCommand, roverCommandsRegex, roverCommandsTypes);
    const roverCommands = validRoverCommand.split('');
    return { roverCommands };
  };
  const showRoverFinalPosition = (rover) => {
    const { x, y, direction } = rover.position();
    console.log(`Final Position: ${x} ${y} ${direction}\n`);
  };
  const run = async () => {
    try {
      const { plateau } = await generatePlateau();
      while (true) {
        const { rover } = await landRover(plateau);
        const { roverCommands } = await getRoverCommands(rover);
        rover.sequentialMove(roverCommands);
        showRoverFinalPosition(rover);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      prompt.close();
    }
  };

  return { run };
}

module.exports = { createSimulatorController };

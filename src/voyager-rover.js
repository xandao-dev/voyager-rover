const { createPrompt } = require('./views/prompt.js');
const { createPromptValidator } = require('./views/prompt-validator.js');
const { createPlateau } = require('./models/plateauModel.js');
const { createRover } = require('./models/roverModel.js');
const { plateauSizeRegex, roverCommandsRegex, roverPositionRegex } = require('./utils/regex.js');
const { plateauSizeTypes, roverCommandsTypes, roverPositionTypes } = require('./utils/input-types.js');

async function main() {
  const prompt = createPrompt();
  const { validate } = createPromptValidator();
  try {
    const plateauSize = await prompt.ask('Plateau Size: ');
    const [plateauEndX, plateauEndY] = validate(plateauSize, plateauSizeRegex, plateauSizeTypes);
    const plateau = createPlateau({ startX: 0, startY: 0, endX: plateauEndX, endY: plateauEndY });
    console.log(`Plateau size: ${plateau.startX} ${plateau.startY} ${plateau.endX} ${plateau.endY}`);

    let roverId = 0;
    while (true) {
      const roverPosition = await prompt.ask('Landing Position: ');
      const [roverX, roverY, roverDirection] = validate(roverPosition, roverPositionRegex, roverPositionTypes);
      const rover = createRover({ id: roverId, pos: { x: roverX, y: roverY, direction: roverDirection } });
      plateau.rovers.push(rover);
      console.log(`Rover position: ${rover.position().x} ${rover.position().y} ${rover.position().direction}`);

      const roverCommand = await prompt.ask('Instructions: ');
      const [validRoverCommand] = validate(roverCommand, roverCommandsRegex, roverCommandsTypes);
      validRoverCommand.split('').forEach((command) => {
        try {
          rover.move(plateau, command);
        } catch (error) {
          console.error(error.message);
        }
      });
      console.log(`Rover position Final: ${rover.position().x} ${rover.position().y} ${rover.position().direction} \n`);
      roverId += 1;
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    prompt.close();
  }
}

main();

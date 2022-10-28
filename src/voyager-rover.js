const { createPrompt } = require('./views/prompt.js');
const { createPlateau } = require('./models/plateauModel.js');
const { createRover } = require('./models/roverModel.js');

async function main() {
  const prompt = createPrompt();
  try {
    const plateauSize = await prompt.ask('What is the plateau size (E.g. 5 5)? ');
    const [plateauEndX, plateauEndY] = plateauSize.split(' ').map((value) => parseInt(value, 10));
    const plateau = createPlateau({ startX: 0, startY: 0, endX: plateauEndX, endY: plateauEndY });
    console.log(`Plateau size: ${plateau.startX} ${plateau.startY} ${plateau.endX} ${plateau.endY}`);

    const roverPosition = await prompt.ask('What is the rover position (E.g. 1 2 N)? ');
    const [roverX, roverY, roverDirection] = roverPosition.split(' ');
    const rover = createRover({ x: parseInt(roverX, 10), y: parseInt(roverY, 10), direction: roverDirection });
    console.log(`Rover position: ${rover.position().x} ${rover.position().y} ${rover.position().direction}`);

    const roverCommands = await prompt.ask('What are the rover commands (E.g. LMRMLMRMM)? ');
    console.log(`Rover commands: ${roverCommands}`);
    roverCommands.split('').forEach((command) => {
      try {
        console.log(`Rover position: ${rover.position().x} ${rover.position().y} ${rover.position().direction}`);
        rover.move(plateau, command);
      } catch (error) {
        console.error(error.message);
      }
      console.log(`Rover position Final: ${rover.position().x} ${rover.position().y} ${rover.position().direction}`);
    });

    // Calculations
    // Show results

    // Repeat: rover position and commands
    // Repeat: Calculations
    // Repeat: Show results
  } catch (error) {
    console.error(error);
  } finally {
    prompt.close();
  }
}

main();

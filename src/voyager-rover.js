const { createPrompt } = require('./views/prompt.js');
const { createPlateau } = require('./models/plateauModel.js');
const { createRover } = require('./models/roverModel.js');

async function main() {
  const prompt = createPrompt();
  try {
    const plateauSize = await prompt.ask('Plateau Size: ');
    const [plateauEndX, plateauEndY] = plateauSize.split(' ').map((value) => parseInt(value, 10));
    const plateau = createPlateau({ startX: 0, startY: 0, endX: plateauEndX, endY: plateauEndY });
    // console.log(`Plateau size: ${plateau.startX} ${plateau.startY} ${plateau.endX} ${plateau.endY}`);

    let roverId = 0;
    while (true) {
      const roverPosition = await prompt.ask('Landing Position: ');
      const [roverX, roverY, roverDirection] = roverPosition.split(' ');
      const rover = createRover({
        id: roverId,
        pos: { x: parseInt(roverX, 10), y: parseInt(roverY, 10), direction: roverDirection },
      });
      plateau.rovers.push(rover);
      // console.log(`Rover position: ${rover.position().x} ${rover.position().y} ${rover.position().direction}`);

      const roverCommands = await prompt.ask('Instructions: ');
      // console.log(`Rover commands: ${roverCommands}`);
      roverCommands.split('').forEach((command) => {
        try {
          // console.log(`Rover position: ${rover.position().x} ${rover.position().y} ${rover.position().direction}`);
          rover.move(plateau, command);
        } catch (error) {
          console.error(error.message);
        }
      });
      console.log(`Rover position Final: ${rover.position().x} ${rover.position().y} ${rover.position().direction} \n`);
      roverId += 1;
    }
  } catch (error) {
    console.error(error);
  } finally {
    prompt.close();
  }
}

main();

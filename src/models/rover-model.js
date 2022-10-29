const { cardinalDirections, cardinalDirectionsDegrees, roverCommands } = require('../utils/constants.js');
const { ValidationError } = require('../errors/validation-error.js');
const { getKeyByValue } = require('../utils/helpers.js');

function createRoverModel({ id, pos: { x, y, direction } }) {
  const roverId = id;
  const roverPosition = { x, y, direction };

  validateRoverId(roverId);
  validateRoverCoordinates(roverPosition.x, roverPosition.y);
  validateRoverDirection(roverPosition.direction);

  const getPosition = () => ({ ...roverPosition });

  const estimateForwardPosition = () => {
    const { x, y } = roverPosition;

    if (roverPosition.direction === cardinalDirections.NORTH) {
      return { x, y: y + 1 };
    } else if (roverPosition.direction === cardinalDirections.EAST) {
      return { x: x + 1, y };
    } else if (roverPosition.direction === cardinalDirections.SOUTH) {
      return { x, y: y - 1 };
    } else if (roverPosition.direction === cardinalDirections.WEST) {
      return { x: x - 1, y };
    }
  };

  const willCollide = (map, forwardPosition) => {
    const otherRovers = map.rovers().filter((rover) => rover !== id);
    return otherRovers.some((neighborRover) => {
      const neighborRoverPosition = neighborRover.position();
      return neighborRoverPosition.x === forwardPosition.x && neighborRoverPosition.y === forwardPosition.y;
    });
  };

  const moveForwardCarefully = (map) => {
    const forwardPosition = estimateForwardPosition();

    if (willCollide(map, forwardPosition)) {
      return;
    }

    if (!map.isWithinBounds(forwardPosition)) {
      return;
    }

    roverPosition.x = forwardPosition.x;
    roverPosition.y = forwardPosition.y;
  };

  const rotateTo = (directionCommand) => {
    let newDirectionDegree = cardinalDirectionsDegrees[roverPosition.direction];
    if (directionCommand === roverCommands.TURN_LEFT) {
      newDirectionDegree -= 90;
    } else if (directionCommand === roverCommands.TURN_RIGHT) {
      newDirectionDegree += 90;
    }
    if (newDirectionDegree < 0) {
      newDirectionDegree += 360;
    } else if (newDirectionDegree >= 360) {
      newDirectionDegree -= 360;
    }
    roverPosition.direction = getKeyByValue(cardinalDirectionsDegrees, newDirectionDegree);
  };

  const move = (map, command) => {
    validateCommand(command);

    if (command === roverCommands.FORWARD) {
      moveForwardCarefully(map);
    } else {
      rotateTo(command);
    }
  };

  const sequentialMove = (map, commands) => {
    validateMap(map);
    commands.forEach((command) => move(map, command));
  };

  return {
    id: roverId,
    position: getPosition,
    sequentialMove,
  };
}

function validateRoverId(id) {
  if (!Number.isInteger(id)) {
    throw new ValidationError('Rover id must be an integer');
  }
  if (id < 0) {
    throw new ValidationError('Rover id must be zero or greater');
  }
}

function validateRoverCoordinates(x, y) {
  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    throw new ValidationError('Rover coordinates must be integers');
  }
  if (x < 0 || y < 0) {
    throw new ValidationError('Rover coordinates must be zero or greater');
  }
}

function validateRoverDirection(direction) {
  if (!Object.values(cardinalDirections).includes(direction)) {
    throw new ValidationError('Rover direction must be one of N, E, S, W');
  }
}

function validateMap(map) {
  if (!map?.rovers || !map?.isWithinBounds) {
    throw new Error('Invalid map');
  }
}

function validateCommand(command) {
  if (!Object.values(roverCommands).includes(command)) {
    throw new Error('Invalid command');
  }
}

module.exports = { createRoverModel };

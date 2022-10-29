const { cardinalDirections, cardinalDirectionsDegrees, roverCommands } = require('../utils/constants.js');
const { ValidationError } = require('../errors/validation-error.js');
const { getKeyByValue } = require('../utils/helpers.js');

function createRoverModel({ id, pos: { x, y, direction } }, plateau) {
  const roverId = id;
  const roverPosition = { x, y, direction };

  validateRoverId(roverId);
  validateRoverCoordinates(roverPosition.x, roverPosition.y);
  validateRoverDirection(roverPosition.direction);
  validatePlateau(plateau);
  validateLandingPosition(plateau, roverPosition.x, roverPosition.y);

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
  const willCollide = (forwardPosition) => {
    const otherRovers = plateau.rovers().filter((rover) => rover !== id);
    return otherRovers.some((neighborRover) => {
      const neighborRoverPosition = neighborRover.position();
      return neighborRoverPosition.x === forwardPosition.x && neighborRoverPosition.y === forwardPosition.y;
    });
  };
  const moveForwardCarefully = () => {
    const forwardPosition = estimateForwardPosition();

    if (willCollide(forwardPosition)) {
      return;
    }

    if (!plateau.isWithinBounds(forwardPosition)) {
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
  const move = (command) => {
    validateCommand(command);

    if (command === roverCommands.FORWARD) {
      moveForwardCarefully();
    } else {
      rotateTo(command);
    }
  };
  const sequentialMove = (commands) => commands.forEach((command) => move(command));

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
function validatePlateau(plateau) {
  if (!plateau?.rovers || !plateau?.isWithinBounds) {
    throw new Error('Invalid plateau');
  }
}
function validateLandingPosition(plateau, x, y) {
  if (!plateau.isWithinBounds({ x, y })) {
    throw new Error('Rover cannot be placed outside of the plateau');
  }
  const hasAnotherRoverInPoint = plateau.rovers().some((neighborRover) => {
    const neighborRoverPosition = neighborRover.position();
    if (neighborRoverPosition.x === x && neighborRoverPosition.y === y) {
      return true;
    }
  });
  if (hasAnotherRoverInPoint) {
    throw new Error('Rover cannot be placed on top of another rover');
  }
}
function validateCommand(command) {
  if (!Object.values(roverCommands).includes(command)) {
    throw new Error('Invalid command');
  }
}

module.exports = { createRoverModel };

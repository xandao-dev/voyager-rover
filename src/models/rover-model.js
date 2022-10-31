const { cardinalDirections, cardinalDirectionsDegrees, roverCommands } = require('../utils/constants.js');
const { ValidationError } = require('../errors/validation-error.js');
const { getKeyByValue } = require('../utils/helpers.js');

function createRoverModel({ id, pos: { x, y, direction } }, plateau) {
  const roverId = id;
  const roverPosition = { x, y, direction };
  let movementReports = getInitialMovementReports();

  validateRoverId(roverId);
  validateRoverCoordinates(roverPosition.x, roverPosition.y);
  validateRoverDirection(roverPosition.direction);
  validatePlateau(plateau);
  validateLandingPosition(plateau, roverPosition.x, roverPosition.y);

  const getId = () => roverId;
  const getPosition = () => ({ ...roverPosition });
  const getMovementReports = () => ({ ...movementReports, failure: { ...movementReports.failure } });
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
    const neighborRovers = plateau.getRovers().filter((rover) => rover.getId() !== roverId);
    return neighborRovers.some((neighborRover) => {
      const neighborRoverPosition = neighborRover.getPosition();
      return neighborRoverPosition.x === forwardPosition.x && neighborRoverPosition.y === forwardPosition.y;
    });
  };
  const moveForwardCarefully = () => {
    const forwardPosition = estimateForwardPosition();

    if (willCollide(forwardPosition)) {
      movementReports.failure.collisions++;
      return;
    }

    if (!plateau.isWithinBounds(forwardPosition)) {
      movementReports.failure.outOfBounds++;
      return;
    }

    roverPosition.x = forwardPosition.x;
    roverPosition.y = forwardPosition.y;
    movementReports.success++;
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
    movementReports.success++;
  };
  const move = (command) => {
    validateCommand(command);

    if (command === roverCommands.FORWARD) {
      moveForwardCarefully();
    } else {
      rotateTo(command);
    }
  };
  const sequentialMove = (commands) => {
    movementReports = getInitialMovementReports();
    movementReports.total = commands.length;
    commands.forEach((command) => move(command));
  };

  return {
    getId,
    getPosition,
    getMovementReports,
    sequentialMove,
  };
}

function getInitialMovementReports() {
  return {
    total: 0,
    success: 0,
    failure: {
      outOfBounds: 0,
      collisions: 0,
    },
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
  if (!plateau?.getRovers || !plateau?.isWithinBounds) {
    throw new Error('Invalid plateau, can not land rover on it');
  }
}
function validateLandingPosition(plateau, x, y) {
  if (!plateau.isWithinBounds({ x, y })) {
    throw new Error('Rover cannot be placed outside of the plateau');
  }
  const hasAnotherRoverInPoint = plateau.getRovers().some((neighborRover) => {
    const neighborRoverPosition = neighborRover.getPosition();
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

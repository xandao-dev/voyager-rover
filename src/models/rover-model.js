const { cardinalDirections, cardinalDirectionsDegrees } = require('../utils/constants.js');
const { getKeyByValue } = require('../utils/helpers.js');

function createRover({ id, pos: { x, y, direction } }) {
  const roverId = id;
  const roverPosition = { x, y, direction };
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
    } else {
      throw new Error('Invalid direction');
    }
  };

  const willCollide = (rovers, forwardPosition) => {
    const otherRovers = rovers.filter((rover) => rover !== id);
    return otherRovers.some((neighborRover) => {
      const neighborRoverPosition = neighborRover.position();
      return neighborRoverPosition.x === forwardPosition.x && neighborRoverPosition.y === forwardPosition.y;
    });
  };

  const moveForward = (map, rovers) => {
    const forwardPosition = estimateForwardPosition();

    if (willCollide(rovers, forwardPosition)) {
      throw new Error('Rover will collide with another rover');
    }

    if (!map.isWithinBounds(forwardPosition)) {
      throw new Error('Rover cannot move outside the bounds');
    }

    roverPosition.x = forwardPosition.x;
    roverPosition.y = forwardPosition.y;
  };

  const rotateTo = (directionCommand) => {
    let newDirectionDegree = cardinalDirectionsDegrees[direction];
    if (directionCommand === 'L') {
      newDirectionDegree -= 90;
    } else if (directionCommand === 'R') {
      newDirectionDegree += 90;
    }
    if (newDirectionDegree < 0) {
      newDirectionDegree += 360;
    } else if (newDirectionDegree >= 360) {
      newDirectionDegree -= 360;
    }
    roverPosition.direction = getKeyByValue(cardinalDirectionsDegrees, newDirectionDegree);
  };

  const move = (map, rovers, command) => {
    if (command === 'M') {
      try {
        moveForward(map, rovers);
      } catch (error) {
        // FIXME: add a logger
        console.error(error.message);
      }
    } else {
      rotateTo(command);
    }
  };

  const sequenceMove = (map, rovers, commands) => commands.forEach((command) => move(map, rovers, command));

  return {
    id: roverId,
    position: getPosition,
    moveForward,
    rotateTo,
    move,
    sequenceMove,
  };
}

module.exports = { createRover };
